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
    const [paymentMethod, setPaymentMethod] = useState('qris');
    const { product } = usePage<ProductProps>().props

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const [quantity, setQuantity] = useState(1)

    const shippingCost = 25000
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
                                    onClick={() => setPaymentMethod('qris')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'qris'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {/* QRIS Logo */}
                                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-xs">QRIS</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">QRIS Payment</p>
                                                <p className="text-xs text-gray-500">Quick Response Code Indonesian Standard</p>
                                            </div>
                                        </div>
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

                            {paymentMethod === 'qris' && (
                                <div className="space-y-4 pt-4 border-t">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200">
                                        {/* Logo QRIS */}
                                        <div className="flex justify-center mb-6">
                                            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">QR</span>
                                                    </div>
                                                    <span className="font-bold text-xl bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">QRIS</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center mb-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Scan QR Code to Pay</p>
                                            <p className="text-xs text-gray-500">Use any e-wallet app to scan</p>
                                        </div>
                                        
                                        {/* QR Code Display Area - Ready for Midtrans integration */}
                                        <div className="flex justify-center mb-6">
                                            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200">
                                                {/* Placeholder QR Code - Replace with Midtrans QR Code */}
                                                <div id="qris-code" className="w-64 h-64 bg-white flex items-center justify-center">
                                                    <svg className="w-full h-full" viewBox="0 0 200 200">
                                                        <rect width="200" height="200" fill="white"/>
                                                        <rect x="10" y="10" width="60" height="60" fill="black"/>
                                                        <rect x="20" y="20" width="40" height="40" fill="white"/>
                                                        <rect x="30" y="30" width="20" height="20" fill="black"/>
                                                        
                                                        <rect x="130" y="10" width="60" height="60" fill="black"/>
                                                        <rect x="140" y="20" width="40" height="40" fill="white"/>
                                                        <rect x="150" y="30" width="20" height="20" fill="black"/>
                                                        
                                                        <rect x="10" y="130" width="60" height="60" fill="black"/>
                                                        <rect x="20" y="140" width="40" height="40" fill="white"/>
                                                        <rect x="30" y="150" width="20" height="20" fill="black"/>
                                                        
                                                        <rect x="80" y="30" width="10" height="10" fill="black"/>
                                                        <rect x="100" y="30" width="10" height="10" fill="black"/>
                                                        <rect x="90" y="50" width="10" height="10" fill="black"/>
                                                        <rect x="80" y="70" width="10" height="10" fill="black"/>
                                                        <rect x="110" y="60" width="10" height="10" fill="black"/>
                                                        <rect x="100" y="80" width="10" height="10" fill="black"/>
                                                        <rect x="130" y="90" width="10" height="10" fill="black"/>
                                                        <rect x="80" y="100" width="10" height="10" fill="black"/>
                                                        <rect x="110" y="110" width="10" height="10" fill="black"/>
                                                        <rect x="90" y="130" width="10" height="10" fill="black"/>
                                                        <rect x="140" y="130" width="10" height="10" fill="black"/>
                                                        <rect x="160" y="140" width="10" height="10" fill="black"/>
                                                        <rect x="130" y="160" width="10" height="10" fill="black"/>
                                                        <rect x="150" y="170" width="10" height="10" fill="black"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center mb-6">
                                            <p className="text-xs text-gray-500 mb-1">Amount to Pay</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {formatPrice(total)}
                                            </p>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-xs font-bold">i</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-blue-900 font-semibold">How to pay:</p>
                                                    <ol className="text-xs text-blue-800 mt-1 space-y-1">
                                                        <li>1. Open your e-wallet app (GoPay, OVO, DANA, ShopeePay, etc.)</li>
                                                        <li>2. Scan the QR code above</li>
                                                        <li>3. Confirm the payment amount</li>
                                                        <li>4. Your order will be processed automatically</li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                            <span className="text-xs text-gray-600">Powered by:</span>
                                            <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full">GoPay</span>
                                            <span className="text-xs font-semibold bg-purple-600 text-white px-3 py-1 rounded-full">OVO</span>
                                            <span className="text-xs font-semibold bg-blue-500 text-white px-3 py-1 rounded-full">DANA</span>
                                            <span className="text-xs font-semibold bg-orange-500 text-white px-3 py-1 rounded-full">ShopeePay</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'bank-transfer' && (
                                <div className="space-y-4 pt-4 border-t">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm font-semibold text-blue-900 mb-2">Transfer to:</p>
                                        <p className="text-xs text-blue-700 mb-1">Bank: BCA</p>
                                        <p className="text-xs text-blue-700 mb-1">Account: 1234567890</p>
                                        <p className="text-xs text-blue-700">Name: Deloitte Digital</p>
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