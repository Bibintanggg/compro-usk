import React, { useEffect, useState } from 'react';
import { Lock, ArrowLeft, CreditCard, ChevronLeft } from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';
import { Products } from '@/features/products/types';
import { PageProps } from '@/types';
import AppNavbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
// import { Button } from '@/Components/ui/button';
import { toast } from "sonner"

declare global {
    interface Window {
        snap: any;
    }
}

interface ProductProps extends PageProps {
    product: Products
    snap_token?: string
}

export default function Product() {
    const { product, snap_token } = usePage<ProductProps>().props;
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
    });

    useEffect(() => {
        if (snap_token && window.snap) {
            console.log('Snap token received:', snap_token);
            window.snap.pay(snap_token, {
                onSuccess: function (result: any) {
                    console.log('Payment success:', result);
                    toast("Payment successful!");
                    router.visit('/');
                },
                onPending: function (result: any) {
                    console.log('Payment pending:', result);
                    toast("Payment Pending !!");
                },
                onError: function (result: any) {
                    console.log('Payment error:', result);
                    toast("Payment failed!");
                },
                onClose: function () {
                    console.log('Popup closed');
                }
            });
        }
    }, [snap_token]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const quantity = 1;
    const shippingCost = 25000;
    const taxRate = 0.1;

    const subTotal = product.price * quantity;
    const tax = subTotal * taxRate;
    const total = subTotal + shippingCost + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            route('product.checkout.store', product.slug),
            {
                product_id: product.id,
                customer_name: `${formData.firstName} ${formData.lastName}`,
                customer_email: formData.email,
                phone: formData.phone,
                address: formData.address,
                payment_method: paymentMethod,
            },
        );
    };


    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <AppNavbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/products/all"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Products</span>
                </Link>

                <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-gray-900 mb-4">Shipping Address</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                            required
                                        />
                                    </div>

                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                        required
                                    />

                                    <textarea
                                        placeholder="Street Address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                                        required
                                    />

                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Province"
                                            value={formData.province}
                                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                            className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="ZIP"
                                            value={formData.postalCode}
                                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                            className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'qris' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="qris"
                                            checked={paymentMethod === 'qris'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-orange-500"
                                        />
                                        <img src="/images/qris-logo.png" alt="" className='w-10 h-10 rounded-lg' />
                                        <div>
                                            <p className="font-semibold text-gray-900">QRIS</p>
                                            <p className="text-xs text-gray-500">GoPay, OVO, DANA, ShopeePay</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="bank"
                                            checked={paymentMethod === 'bank'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-orange-500"
                                        />
                                        <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                                            <CreditCard className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Bank Transfer</p>
                                            <p className="text-xs text-gray-500">BCA, BNI, Mandiri</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!paymentMethod}
                                className="w-full py-3.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                <Lock className="w-4 h-4" />
                                Pay {formatPrice(total)}
                            </button>
                        </div>

                        <div>
                            <div className="bg-white rounded-lg border p-6 sticky top-4">
                                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

                                <div className="flex gap-3 pb-4 mb-4 border-b">
                                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        {product.image ? (

                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : ((
                                            <img src="/images/fallback.jpg" alt="" className="w-full h-full object-cover" />
                                        ))}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                        <p className="text-xs text-gray-600 mt-1">Qty: 1</p>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        {formatPrice(product.price)}
                                    </div>
                                </div>

                                <div className="space-y-2 pb-4 mb-4 border-b text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>{formatPrice(subTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span>{formatPrice(shippingCost)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Total</span>
                                    <span className="text-xl font-bold text-orange-600">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
