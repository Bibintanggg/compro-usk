// resources/js/Pages/OrderPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppNavbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Clock, CheckCircle, XCircle, CreditCard, Package, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Order } from '@/features/transactions/types';

declare global {
    interface Window {
        snap: any;
    }
}

interface OrdersPageProps extends PageProps {
    orders: Order[];
    snap_token?: string;
    flash?: {
        error?: string;
        success?: string;
    };
}

export default function Orders() { // ← Bisa tetap OrdersIndex atau ganti jadi OrderPage
    const { orders, snap_token, flash } = usePage<OrdersPageProps>().props;
    const [snapReady, setSnapReady] = useState(false);
    const [filter, setFilter] = useState<'all' | 'pending' | 'success' | 'failed'>('all');

    // Load Midtrans Snap script
    useEffect(() => {
        if (window.snap) {
            setSnapReady(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        script.onload = () => setSnapReady(true);
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Handle snap token dari retry payment
    // Handle snap token dari retry payment
    useEffect(() => {
        console.log('Snap token:', snap_token);
        console.log('Snap ready:', snapReady);

        if (snap_token && snapReady && window.snap) {
            console.log('Opening Midtrans popup...');

            window.snap.pay(snap_token, {
                onSuccess: (result: any) => {
                    console.log('Payment success:', result);
                    toast.success("Payment Successful!");

                    // PENTING: Redirect ke /orders dengan router.visit (bukan reload)
                    router.visit('/orders', {
                        method: 'get', // ← PENTING: Force GET method
                        onSuccess: () => {
                            console.log('Redirected to orders page');
                        }
                    });
                },
                onPending: (result: any) => {
                    console.log('Payment pending:', result);
                    toast("Payment Pending - Check your email");

                    // Redirect ke /orders
                    router.visit('/orders', { method: 'get' });
                },
                onError: (result: any) => {
                    console.log('Payment error:', result);
                    toast.error("Payment Failed");

                    // Stay on page atau redirect
                    router.visit('/orders', { method: 'get' });
                },
                onClose: () => {
                    console.log('Payment popup closed');
                    toast("Payment window closed");
                }
            });
        }
    }, [snap_token, snapReady]);

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const normalizedStatus = status.toLowerCase();

        const config: Record<string, { style: string; icon: React.ReactNode; label: string }> = {
            pending: {
                style: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                icon: <Clock className="w-4 h-4" />,
                label: 'Pending'
            },
            success: {
                style: 'bg-green-100 text-green-800 border-green-200',
                icon: <CheckCircle className="w-4 h-4" />,
                label: 'Success'
            },
            failed: {
                style: 'bg-red-100 text-red-800 border-red-200',
                icon: <XCircle className="w-4 h-4" />,
                label: 'Failed'
            },
        };

        const current = config[normalizedStatus] || {
            style: 'bg-gray-100 text-gray-800 border-gray-200',
            icon: <Package className="w-4 h-4" />,
            label: status
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${current.style}`}>
                {current.icon}
                {current.label}
            </span>
        );
    };

    const handleRetryPayment = (orderId: string) => {
        console.log('Retry payment for:', orderId); // Debug
        router.post(route('orders.retry-payment', orderId));
    };

    // Filter orders
    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status.toLowerCase() === filter);

    // Count by status
    const counts = {
        all: orders.length,
        pending: orders.filter(o => o.status.toLowerCase() === 'pending').length,
        success: orders.filter(o => o.status.toLowerCase() === 'success').length,
        failed: orders.filter(o => o.status.toLowerCase() === 'failed').length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AppNavbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                        <p className="text-gray-600 mt-2">Track and manage your orders</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <Link href={"/products/all"} className='flex items-center gap-3'>
                            <ChevronLeft />
                            Back
                        </Link>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-lg border p-2 mb-6 flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors ${filter === 'all'
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All ({counts.all})
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors ${filter === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Pending ({counts.pending})
                    </button>
                    <button
                        onClick={() => setFilter('success')}
                        className={`px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors ${filter === 'success'
                            ? 'bg-green-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Success ({counts.success})
                    </button>
                    <button
                        onClick={() => setFilter('failed')}
                        className={`px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors ${filter === 'failed'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Failed ({counts.failed})
                    </button>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-lg border p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {filter === 'all' ? 'No Orders Yet' : `No ${filter} Orders`}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'all'
                                ? 'Start shopping to see your orders here'
                                : `You don't have any ${filter} orders`}
                        </p>
                        {filter === 'all' && (
                            <Link
                                href="/products/all"
                                className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Browse Products
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            const latestPayment = order.payments && order.payments.length > 0
                                ? order.payments[order.payments.length - 1]
                                : null;

                            return (
                                <div key={order.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Product Image */}
                                        {order.product && (
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {order.product.image ? (
                                                    <img
                                                        src={`/storage/${order.product.image}`}
                                                        alt={order.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/images/fallback.jpg"
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {/* Order Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-lg">
                                                        {order.product?.name || 'Product'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {order.order_code}
                                                    </p>
                                                </div>
                                                {getStatusBadge(order.status)}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                                                <div>
                                                    <p className="text-gray-600">Order Date</p>
                                                    <p className="font-medium">{formatDate(order.created_at)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Total</p>
                                                    <p className="font-bold text-orange-600">{formatPrice(order.price)}</p>
                                                </div>
                                                {latestPayment && (
                                                    <>
                                                        <div>
                                                            <p className="text-gray-600">Payment Method</p>
                                                            <p className="font-medium uppercase">{latestPayment.method}</p>
                                                        </div>
                                                        {latestPayment.customer_name && (
                                                            <div>
                                                                <p className="text-gray-600">Customer</p>
                                                                <p className="font-medium">{latestPayment.customer_name}</p>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {(order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'failed') && (
                                                <button
                                                    onClick={() => handleRetryPayment(order.id)}
                                                    className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2"
                                                >
                                                    <CreditCard className="w-4 h-4" />
                                                    {order.status.toLowerCase() === 'failed' ? 'Retry Payment' : 'Continue Payment'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
