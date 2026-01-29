import { useState } from 'react';
import { CreditCard, Lock, ShoppingBag, Check, Truck } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Products } from '@/features/products/types';
import { PageProps } from '@/types';
import AppNavbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface ProductProps extends PageProps {
    product: Products
}
export default function Product() {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const { product } = usePage<ProductProps>().props

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const [quantity, setQuantity] = useState(1)

    const shippingCost = 5000
    const taxRate = 0.1

    const subTotal = product.price * quantity
    const tax = subTotal * taxRate
    const total = subTotal + shippingCost + tax

    return (
        <div className="min-h-screen bg-gray-50">
            <AppNavbar />

            {/* <div className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        Deloitte Digital
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Lock className="w-4 h-4" />
                        <span>Secure Checkout</span>
                    </div>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    1
                                </div>
                                <span className="font-semibold">Information</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    2
                                </div>
                                <span className="text-gray-500">Payment</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold mb-6">Contact Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Street address"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Jakarta"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="DKI"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="12345"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+62 812 3456 7890"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                            <div className="space-y-3 mb-6">
                                <div
                                    onClick={() => setPaymentMethod('credit-card')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'credit-card'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-5 h-5" />
                                            <span className="font-semibold">Credit Card</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'paypal'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                            P
                                        </div>
                                        <span className="font-semibold">PayPal</span>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('bank-transfer')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'bank-transfer'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                            B
                                        </div>
                                        <span className="font-semibold">Bank Transfer</span>
                                    </div>
                                </div>
                            </div>

                            {paymentMethod === 'credit-card' && (
                                <div className="space-y-4 pt-4 border-t">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Link
                            href="/products/all"
                                className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-300 font-bold text-center hover:bg-gray-50 transition-colors"
                            >
                                Back to Shop
                            </Link>
                            <button className="flex-1 py-4 px-6 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                Complete Order
                                <Lock className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="flex gap-4 mb-6 pb-6 border-b">
                                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                    <p className="text-sm font-semibold mt-2">Qty: 1</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{formatPrice(product.price)}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none"
                                    />
                                    <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 pb-6 border-b">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">{formatPrice(subTotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">{formatPrice(shippingCost)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-semibold"> {formatPrice(tax)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold">Total</span>
                                <span className="text-2xl font-bold">
                                    {formatPrice(total)}
                                </span>
                            </div>


                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-green-900 text-sm">Secure Payment</p>
                                    <p className="text-xs text-green-700">Your payment information is protected</p>
                                </div>
                            </div>

                            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                                <Truck className="w-10 h-10 text-blue-600 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-blue-900 text-sm">Free Shipping</p>
                                    <p className="text-xs text-blue-700">Estimated delivery: 3-5 business days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
}
