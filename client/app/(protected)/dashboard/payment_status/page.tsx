"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPaymentStatus as fetchPaymentStatus } from "@/actions/payment.action";

export default function PaymentStatus() {
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(10);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        // Countdown interval
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Fetch payment status after 10 seconds
        const timer = setTimeout(() => {
            checkPaymentStatus();
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };
    }, []);

    const checkPaymentStatus = async () => {
        try {
            const response = await fetchPaymentStatus();
            console.log('Payment status response:', response);
            
            // Assuming response has a success field
            setPaymentSuccess(response?.success || response?.payment_status || true);
            setLoading(false);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error("Error fetching payment status:", error);
            setPaymentSuccess(false);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex p-24 flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 ">
                <Card className="w-full max-w-md shadow-2xl border-2 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-10 pb-10 px-8">
                        <div className="text-center space-y-6">
                            {/* Animated Loading Icon */}
                            <div className="relative inline-flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-green-200 dark:bg-green-900 animate-ping opacity-75"></div>
                                <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
                                    <Loader2 className="h-10 w-10 text-white animate-spin" />
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    Processing Payment
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Please wait while we verify your transaction...
                                </p>
                            </div>

                            {/* Countdown Timer */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-600 to-green-700 opacity-20 blur-xl"></div>
                                <div className="relative bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-950 rounded-xl p-6 border border-green-300 dark:border-green-700">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <Clock className="h-6 w-6 text-green-700 dark:text-green-400 animate-pulse" />
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                            Time Remaining
                                        </p>
                                    </div>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-6xl font-bold text-green-700 dark:text-green-400 tabular-nums">
                                            {countdown}
                                        </span>
                                        <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                                            sec
                                        </span>
                                    </div>
                                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-green-600 to-green-700 transition-all duration-1000 ease-linear"
                                            style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Text */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                Do not close or refresh this page
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Success/Failure State
    return (
        <div className="flex p-24 flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 ">
            <Card className={`w-full max-w-md shadow-2xl border-2 ${paymentSuccess ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700'}`}>
                <CardContent className="pt-10 pb-10 px-8">
                    <div className="text-center space-y-6">
                        {/* Success/Error Icon */}
                        <div className="relative inline-flex items-center justify-center">
                            <div className={`absolute inset-0 rounded-full ${paymentSuccess ? 'bg-green-200 dark:bg-green-900' : 'bg-red-200 dark:bg-red-900'} animate-ping opacity-75`}></div>
                            <div className={`relative h-20 w-20 rounded-full ${paymentSuccess ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-rose-600'} flex items-center justify-center shadow-lg`}>
                                {paymentSuccess ? (
                                    <CheckCircle2 className="h-12 w-12 text-white animate-bounce" />
                                ) : (
                                    <XCircle className="h-12 w-12 text-white" />
                                )}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <h2 className={`text-3xl font-bold mb-2 ${paymentSuccess ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                {paymentSuccess ? 'Payment Successful!' : 'Payment Failed'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {paymentSuccess 
                                    ? 'Your payment has been processed successfully.' 
                                    : 'There was an issue processing your payment. Please try again.'}
                            </p>
                        </div>

                        {/* Action Button */}
                        <Button asChild className="w-full" size="lg">
                            <Link href="/dashboard">
                                Return to Dashboard
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}