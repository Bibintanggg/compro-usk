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
            return response()->json(['status' => 'signature_invalid'], 400);
        }

        $order = Order::where('order_code', $request->order_id)->first();

        if (!$order) {
            return response()->json(['status' => 'order_not_found'], 404);
        }

        // mencari payment
        $payment = Payment::where('order_id', $order->id)->first();

        $transactionStatus = $request->transaction_status;
        $fraudStatus = $request->fraud_status ?? null;

        Log::info('Midtrans Notification', [
            'order_code' => $request->order_id,
            'transaction_status' => $transactionStatus,
            'fraud_status' => $fraudStatus
        ]);

        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $order->update(['status' => 'success']);
                $payment->update([
                    'status' => 'success',
                    'transaction_id' => $request->transaction_id
                ]);
            }
        } elseif ($transactionStatus == 'settlement') {
            $order->update(['status' => 'success']);
            $payment->update([
                'status' => 'success',
                'transaction_id' => $request->transaction_id
            ]);
        } elseif ($transactionStatus == 'pending') {
            $order->update(['status' => 'pending']);
            $payment->update(['status' => 'pending']);
        } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
            $order->update(['status' => 'failed']);
            $payment->update(['status' => 'failed']);
        }

        return response()->json(['message' => 'Notification handled']);
    }
}
