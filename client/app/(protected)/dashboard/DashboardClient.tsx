"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  XCircle,
  CreditCard,
  FileText,
  Mail,
  Phone as PhoneIcon,
  Building2,
  Calendar,
  User,
  Loader2,
  Clock,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { createPayment, getPaymentStatus } from "@/actions/payment.action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { generatePayslip } from "@/lib/generatePayslip";
import EditProfileDrawer from "@/components/EditProfileDrawer";

export default function DashboardClient() {
  const { userData, loading, refreshAuth } = useAuth();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [paymentData, setPaymentData] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Check payment status on mount if conditions are met
  useEffect(() => {
    const checkPaymentOnLoad = async () => {
      // Get Payment_ID from cookies
      const paymentIDMatch = document.cookie.match(new RegExp('(^| )Payment_ID=([^;]+)'));
      const paymentID = paymentIDMatch ? paymentIDMatch[2] : null;

      // Check if user's payment status is false
      const paymentStatus = userData?.payment_status ?? false;

      // Only check if PaymentID exists and payment_status is false
      if (paymentID && !paymentStatus && !loading) {
        console.log('Payment ID found and payment not confirmed. Starting status check...');
        setIsCheckingPayment(true);

        // Start countdown
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        // Check payment status after 10 seconds
        setTimeout(async () => {
          try {
            const response = await getPaymentStatus();
            console.log('Payment status check response:', response);

            // Store payment data for payslip generation
            if (response?.data) {
              setPaymentData(response.data);
            }

            // Refresh auth to get updated payment status
            refreshAuth();

            if (response?.status === 'PAID') {
              toast({
                title: "Payment Confirmed!",
                description: "Your payment has been successfully processed.",
              });
            } else {
              toast({
                title: "Payment Pending",
                description: "Payment verification is still in progress.",
                variant: "destructive",
              });
            }
          } catch (error: any) {
            console.error('Payment status check error:', error);
            toast({
              title: "Status Check Failed",
              description: error.message || "Could not verify payment status.",
              variant: "destructive",
            });
          } finally {
            setIsCheckingPayment(false);
          }
        }, 10000);

        return () => clearInterval(countdownInterval);
      }
    };

    checkPaymentOnLoad();
  }, [userData, loading, refreshAuth, toast]);

  if (loading) return null; // or a spinner

  const userFullName = userData?.Name ?? "User Name"; // Matches User.js Name field
  const userEmail = userData?.email ?? null;
  const userId = userData?._id ?? null;
  const userProfilePic = userData?.profilePic ?? null;
  const Phone = userData?.phone ?? null;
  const Affiliation = userData?.affiliation ?? null; // Matches User.js affiliation (institution/organization)
  const Designation = userData?.designation ?? null; // Matches User.js designation
  const Role = userData?.role ?? "user";
  const PaymentStatus = userData?.payment_status ?? false;
  const CreatedAt = userData?.createdAt ?? null;

  // Calculate if Early Bird period (before Nov 20, 2025)
  const earlyBirdDeadline = new Date('2025-11-20');
  const currentDate = new Date();
  const isEarlyBird = currentDate < earlyBirdDeadline;

  // Get registration fee based on category
  const getRegistrationFee = () => {
    const category = userData?.registrationCategory;
    if (!category) return null;

    const fees = {
      'International Professionals': { earlyBird: 'USD 300', regular: 'USD 400' },
      'International Student': { earlyBird: 'USD 150', regular: 'USD 200' },
      'Local Professionals': { earlyBird: 'BDT 4,000', regular: 'BDT 5,000' },
      'Local Student': { earlyBird: 'BDT 2,000', regular: 'BDT 2,500' },
    };

    return fees[category as keyof typeof fees] || null;
  };

  const registrationFee = getRegistrationFee();
  const currentFee = registrationFee ? (isEarlyBird ? registrationFee.earlyBird : registrationFee.regular) : null;

  const initials = userFullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Handle payment creation
  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      toast({
        title: "Processing Payment",
        description: "Please wait while we connect to the payment gateway...",
      });

      console.log('Initiating payment...');

      const response = await createPayment(userData);

      console.log('Payment response received:', response);

      // Extract redirect URL from the nested response structure
      const redirectURL = response?.data?.data?.redirectURL || response?.data?.redirectURL;

      if (response?.success && redirectURL) {
        console.log('Redirecting to payment gateway:', redirectURL);

        toast({
          title: "Payment Gateway Ready",
          description: "Redirecting you to complete your payment...",
        });

        // Small delay to show the success toast before redirect
        setTimeout(() => {
          window.location.href = redirectURL;
        }, 1000);
      } else {
        console.error('No redirect URL found in response:', response);
        throw new Error('Payment gateway URL not received');
      }
    } catch (error: any) {
      console.error('Payment handler error:', error);

      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error.message || "Failed to initiate payment. Please try again.",
      });

      setIsProcessingPayment(false);
    }
  };

  // Handle payslip download
  const handleDownloadPayslip = async () => {
    try {
      toast({
        title: "Generating Payslip",
        description: "Please wait...",
      });

      // Generate payslip - it will get data from cookies if needed
      generatePayslip(userData);
      
      toast({
        title: "Payslip Downloaded",
        description: "Your payment receipt has been downloaded successfully.",
      });
    } catch (error: any) {
      console.error('Download payslip error:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error.message || "Failed to generate payslip. Please try again.",
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-16 sm:pt-20 md:pt-24 pb-8 space-y-4 sm:space-y-6">
      {/* Payment Status Check Banner */}
      {isCheckingPayment && (
        <Card className="border-2 border-blue-300 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-blue-200 dark:bg-blue-900 animate-ping opacity-75"></div>
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-spin" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
                    Verifying Payment Status
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                    Please wait while we confirm your payment...
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400 tabular-nums">
                  {countdown}s
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back👋</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Here&apos;s an overview of your conference registration and activities.</p>
        </div>
        <div className="w-full sm:w-auto">
          <EditProfileDrawer
            userData={userData}
            onProfileUpdated={refreshAuth}
          />
        </div>
      </div>
      {/* <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access important conference resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/registration-fees">
                <CreditCard className="mr-2 h-4 w-4" />
                Registration Fees
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/submission">
                <FileText className="mr-2 h-4 w-4" />
                Submit Paper
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/committee">
                <User className="mr-2 h-4 w-4" />
                Committee
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card> */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-primary/10">
                <AvatarImage src={userProfilePic || "/user-avatar.png"} alt={userFullName} />
                <AvatarFallback className="text-xl sm:text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">{initials}</AvatarFallback>
              </Avatar>
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold break-words max-w-full px-2">{userFullName}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground break-all">{userEmail ? `@${userEmail.split("@")[0]}` : "@username"}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-xs sm:text-sm font-medium break-all">{userEmail ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <PhoneIcon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-xs sm:text-sm font-medium break-words">{Phone ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Affiliation</p>
                  <p className="text-xs sm:text-sm font-medium break-words">{Affiliation ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Designation</p>
                  <p className="text-xs sm:text-sm font-medium break-words">{Designation ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-xs sm:text-sm font-medium break-words">{CreatedAt ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(CreatedAt)) : "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="text-xs sm:text-sm font-medium font-mono break-all">{userId ?? "—"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl">Registration & Payment</CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-1">Your conference registration status and payment details</CardDescription>
              </div>
              <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
            {/* Current Registration Status */}
            <div className="p-4 sm:p-5 rounded-xl border-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Current Registration Fee</h3>
                <Badge variant={isEarlyBird ? "default" : "secondary"} className={`${isEarlyBird ? 'bg-green-600' : 'bg-orange-600'} text-white px-2 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap`}>
                  {isEarlyBird ? '🎉 Early Bird Rate' : '📅 Regular Rate'}
                </Badge>
              </div>

              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Registration Category</p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-primary break-words">      {userData?.registrationCategory ?? "Not Set"}
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-blue-200 shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Current Fee</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 break-words">
                    {currentFee ?? "—"}
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-purple-200 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Payment Status</p>
                  <div className="flex items-center gap-2">
                    {PaymentStatus ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                        <span className="text-base sm:text-lg font-bold text-green-700">Paid</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
                        <span className="text-base sm:text-lg font-bold text-orange-700">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>



            <Separator />

            {PaymentStatus ? (
              <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4">
                <div className="relative">
                  <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-green-600" />
                </div>
                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-green-600 text-center">Payment Completed!</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center max-w-md px-4">Your registration payment has been successfully processed. You&apos;re all set for the conference!</p>
                <Button
                  onClick={handleDownloadPayslip}
                  className="mt-4 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  size="lg"
                >
                  <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Download Payslip
                </Button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <XCircle className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-orange-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-orange-900 text-center">Payment Pending</h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center max-w-md px-2">Complete your registration payment to confirm your attendance at the conference.</p>

                </div>

                <Separator />

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-sm sm:text-base">Next Steps:</h4>
                  <div className="grid gap-3">
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessingPayment}
                      className="w-full h-auto py-3 sm:py-4 px-4"
                      size="lg"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 w-full">
                        {isProcessingPayment ? (
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin flex-shrink-0" />
                        ) : (
                          <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        )}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                          <div className="font-bold text-sm sm:text-base">
                            {isProcessingPayment ? 'Processing...' : 'Complete Payment'}
                          </div>
                          {currentFee && !isProcessingPayment && (
                            <div className="text-xs opacity-90 whitespace-nowrap">Pay {currentFee} now</div>
                          )}
                        </div>
                      </div>
                    </Button>
                    {/* 
                    <Button  asChild variant="outline" className="w-full h-auto py-4 " size="lg">
                      <Link href="/submission" className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <div className="flex-1 text-left">
                          <div  className="font-semibold">Submit Your Paper</div>
                          <div className="text-xs opacity-70">Upload your research paper</div>
                        </div>
                      </Link>
                    </Button> */}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>


      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-b pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg sm:text-xl">Abstract Details</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">Your research submission and presentation information</CardDescription>
            </div>
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-700 dark:text-blue-400 flex-shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Submission Overview */}
            <div className="p-4 sm:p-5 rounded-xl border-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse flex-shrink-0"></div>
                <span>Submission Overview</span>
              </h3>

              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                    <span>Abstract ID</span>
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-700 dark:text-purple-400 font-mono tracking-tight break-all">
                    {userData?.abstractID ?? "—"}
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Participation Type</p>
                  <Badge variant="secondary" className="text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700 break-words max-w-full">
                    {userData?.participationCategory ?? "Not Set"}
                  </Badge>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Registration Type</p>
                  <Badge variant="outline" className="text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 border-green-400 dark:border-green-600 break-words max-w-full">
                    {userData?.registrationCategory ?? "Not Set"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Abstract Title Section */}
            <div className="rounded-xl border-2 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 px-4 sm:px-5 py-2.5 sm:py-3 border-b-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>Research Title</span>
                </h4>
              </div>
              <div className="p-4 sm:p-5 bg-white dark:bg-gray-900">
                <p className="text-sm sm:text-base font-semibold leading-relaxed text-gray-900 dark:text-gray-100 break-words">
                  {userData?.abstractTitle ?? "No abstract title provided"}
                </p>
              </div>
            </div>

            {/* Presenter Information */}
            <div className="p-4 sm:p-5 rounded-xl border-2 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/50 dark:to-purple-950/50">
              <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>Presenter Information</span>
              </h4>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border shadow-sm">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center flex-shrink-0 border-2 border-indigo-300 dark:border-indigo-700">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-700 dark:text-indigo-300" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Presenter Name</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words">
                    {userData?.presenterName ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  );
}
