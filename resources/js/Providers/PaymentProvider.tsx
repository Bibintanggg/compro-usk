import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from '@inertiajs/react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface PaymentStatusContextType {
    showSuccess: (message?: string, redirectTo?: string) => void;
    showPending: (message?: string, redirectTo?: string) => void;
    showError: (message?: string) => void;
}

const PaymentStatusContext = createContext<PaymentStatusContextType | undefined>(undefined);

export function PaymentStatusProvider({ children }: { children: ReactNode }) {
    const [successOpen, setSuccessOpen] = useState(false);
    const [pendingOpen, setPendingOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);

    // Check session storage saat component mount
    useEffect(() => {
        const pendingStatus = sessionStorage.getItem('payment_pending_status');
        const successStatus = sessionStorage.getItem('payment_success_status');
        const errorStatus = sessionStorage.getItem('payment_error_status');

        if (successStatus) {
            setMessage(successStatus);
            setSuccessOpen(true);
            sessionStorage.removeItem('payment_success_status');
        } else if (pendingStatus) {
            setMessage(pendingStatus);
            setPendingOpen(true);
            sessionStorage.removeItem('payment_pending_status');
        } else if (errorStatus) {
            setMessage(errorStatus);
            setErrorOpen(true);
            sessionStorage.removeItem('payment_error_status');
        }
    }, []);

    const showSuccess = (msg = 'Payment completed successfully!', redirectTo = '/') => {
        sessionStorage.setItem('payment_success_status', msg);
        if (redirectTo) {
            router.visit(redirectTo);
        } else {
            setMessage(msg);
            setSuccessOpen(true);
        }
    };

    const showPending = (msg = 'Your payment is being processed. Please check your email or Midtrans notification.', redirectTo = '/') => {
        sessionStorage.setItem('payment_pending_status', msg);
        if (redirectTo) {
            router.visit(redirectTo);
        } else {
            setMessage(msg);
            setPendingOpen(true);
        }
    };

    const showError = (msg = 'Payment failed. Please try again.') => {
        setMessage(msg);
        setErrorOpen(true);
    };

    const handleSuccessOk = () => {
        setProcessing(true);
        setSuccessOpen(false);
        setProcessing(false);
    };

    const handlePendingOk = () => {
        setProcessing(true);
        setPendingOpen(false);
        setProcessing(false);
    };

    return (
        <PaymentStatusContext.Provider value={{ showSuccess, showPending, showError }}>
            {children}

            <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-6 h-6" />
                            Payment Successful!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {message || 'Please check your email for order confirmation.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={handleSuccessOk}
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : 'OK'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={pendingOpen} onOpenChange={setPendingOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-yellow-600">
                            <Clock className="w-6 h-6" />
                            Payment Pending
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {message || 'Your payment is being verified.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-2">
                        <AlertDialogAction
                            onClick={() => {
                                setPendingOpen(false);
                                // Re-open Midtrans Snap kalau masih available
                                if (window.snap && sessionStorage.getItem('current_snap_token')) {
                                    const token = sessionStorage.getItem('current_snap_token');
                                    window.snap.pay(token);
                                }
                            }}
                        >
                            Continue Payment
                        </AlertDialogAction>
                        <AlertDialogAction
                            onClick={handlePendingOk}
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : 'I\'ll Pay Later'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-6 h-6" />
                            Payment Failed
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {message || 'Payment could not be processed. Please try again or contact support.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setErrorOpen(false)}>
                            Try Again
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </PaymentStatusContext.Provider>
    );
}

export function usePaymentStatus() {
    const context = useContext(PaymentStatusContext);
    if (!context) {
        throw new Error('usePaymentStatus must be used within PaymentStatusProvider');
    }
    return context;
}
