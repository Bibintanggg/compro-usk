<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function store(Request $request, Product $product, MidtransService $midtrans)
    {
        $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        // Hitung total dengan benar (sesuai frontend)
        $quantity = 1;
        $shippingCost = 25000;
        $taxRate = 0.1;
        $subTotal = $product->price * $quantity;
        $tax = $subTotal * $taxRate;
        $total = $subTotal + $shippingCost + $tax;

        $order = Order::create([
            'order_code' => 'ORD-' . time(),
            'product_id' => $product->id,
            'price' => $total, // ✅ Gunakan total yang benar
            'status' => 'pending',
        ]);

        // ✅ Buat snap token
        $snapToken = $midtrans->createSnapToken([
            'order_id' => $order->order_code,
            'amount' => $total, // ✅ Gunakan total yang benar
            'customer_name' => $request->input('customer_name'),
            'customer_email' => $request->input('customer_email'),
        ]);

        Payment::create([
            'order_id' => $order->id,
            'gateway' => 'midtrans',
            'method' => $request->input('payment_method'),
            'amount' => $total, // ✅ Gunakan total yang benar
            'status' => 'pending',
        ]);

        // ✅ PENTING: Return Inertia response dengan snap_token
        return Inertia::render('Products', [
            'product' => $product,
            'snap_token' => $snapToken, // ← Ini yang penting!
        ]);
    }
}
