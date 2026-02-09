<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        if (request()->expectsJson()) {
            $orders = Order::with(['product', 'payments'])
                ->latest()
                ->get();

            return response()->json($orders);
        }

        $orders = Order::with(['product', 'payments'])
            ->latest()
            ->get();

        return Inertia::render('OrderPage', [
            'orders' => $orders
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,success,failed,completed,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->update([
            'status' => $request->status
        ]);

        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'Status order berhasil diperbarui',
                'order' => $order
            ]);
        }

        return back()->with('success', 'Status order berhasil diperbarui');
    }

    public function retryPayment(Order $order, MidtransService $midtrans)
    {
        // Validasi: hanya order dengan status pending atau failed yang bisa retry
        if (!in_array($order->status, ['pending', 'failed'])) {
            return redirect()->route('orders.index')->with('error', 'Cannot retry payment for this order');
        }

        try {
            // Get latest payment untuk ambil customer details dan payment method
            $latestPayment = $order->payments()->latest()->first();

            if (!$latestPayment) {
                return redirect()->route('orders.index')->with('error', 'Payment information not found');
            }

            // Generate snap token menggunakan MidtransService (SAMA SEPERTI CheckoutController)
            $snapToken = $midtrans->createSnapToken([
                'order_id' => $order->order_code . '-RETRY-' . time(),
                'amount' => $order->price,
                'customer_name' => $latestPayment->customer_name ?? 'Customer',
                'customer_email' => $latestPayment->customer_email ?? 'customer@example.com',
                'payment_method' => $latestPayment->method ?? 'qris', // qris, bank, gopay
            ]);

            // Load ulang semua orders
            $orders = Order::with(['product', 'payments'])
                ->latest()
                ->get();

            // Return ke Inertia dengan snap_token (SAMA SEPERTI CheckoutController)
            return Inertia::render('OrderPage', [
                'orders' => $orders,
                'snap_token' => $snapToken,
            ]);

        } catch (\Exception $e) {
            \Log::error('Midtrans retry payment error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());

            return redirect()->route('orders.index')->with('error', 'Failed to generate payment: ' . $e->getMessage());
        }
    }
}
