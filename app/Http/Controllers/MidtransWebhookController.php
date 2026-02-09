<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // ambil data midtrans
        $serverKey = config('midtrans.server_key');
        $hashed = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        // verif signature buat keamanan
        if ($hashed !== $request->signature_key) {
            Log::warning('Invalid signature from Midtrans', [
                'order_id' => $request->order_id,
                'expected' => $hashed,
                'received' => $request->signature_key
            ]);
            return response()->json(['status' => 'signature_invalid'], 400);
        }

        // PENTING: Extract order code (handle RETRY suffix)
        // Format bisa: ORD-1234567890 atau ORD-1234567890-RETRY-1234567890
        $orderId = $request->order_id;
        $orderCode = explode('-RETRY-', $orderId)[0]; // ← INI YANG PENTING!

        Log::info('Processing Midtrans webhook', [
            'original_order_id' => $orderId,
            'extracted_order_code' => $orderCode
        ]);

        $order = Order::where('order_code', $orderCode)->first();

        if (!$order) {
            Log::error('Order not found', [
                'order_code' => $orderCode,
                'original_order_id' => $orderId
            ]);
            return response()->json(['status' => 'order_not_found'], 404);
        }

        // mencari payment
        $payment = Payment::where('order_id', $order->id)->latest()->first(); // ← Ambil yang latest

        if (!$payment) {
            Log::error('Payment not found for order', [
                'order_id' => $order->id,
                'order_code' => $orderCode
            ]);
            return response()->json(['status' => 'payment_not_found'], 404);
        }

        $transactionStatus = $request->transaction_status;
        $fraudStatus = $request->fraud_status ?? null;

        Log::info('Midtrans Notification', [
            'order_code' => $orderCode,
            'transaction_status' => $transactionStatus,
            'fraud_status' => $fraudStatus,
            'transaction_id' => $request->transaction_id
        ]);

        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $order->update(['status' => 'success']);
                $payment->update([
                    'status' => 'success',
                    'transaction_id' => $request->transaction_id
                ]);
                Log::info('Order marked as success (capture)', ['order_code' => $orderCode]);
            }
        } elseif ($transactionStatus == 'settlement') {
            $order->update(['status' => 'success']);
            $payment->update([
                'status' => 'success',
                'transaction_id' => $request->transaction_id
            ]);
            Log::info('Order marked as success (settlement)', ['order_code' => $orderCode]);
        } elseif ($transactionStatus == 'pending') {
            $order->update(['status' => 'pending']);
            $payment->update(['status' => 'pending']);
            Log::info('Order marked as pending', ['order_code' => $orderCode]);
        } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
            $order->update(['status' => 'failed']);
            $payment->update(['status' => 'failed']);
            Log::info('Order marked as failed', ['order_code' => $orderCode, 'reason' => $transactionStatus]);
        }

        return response()->json(['message' => 'Notification handled successfully']);
    }
}
