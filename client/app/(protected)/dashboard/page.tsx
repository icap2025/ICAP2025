import { cookies } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COOKIE_KEYS } from "@/lib/cookies";
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
  Shield
} from "lucide-react";
import Link from "next/link";
import { getCookieValue } from "@/actions/getCookieValue";
/**
 * Helper function to safely parse and decode cookie values.
 */


export default async function DashboardPage() {
  // If you store the whole user object under a single cookie key (e.g. "user")
  const userCookieKey = ((COOKIE_KEYS?.USER as any)?.DATA as string) ?? "user";
  const userData = (await getCookieValue(userCookieKey)) ?? {};

  // Normalize possible field names from your stored user object
  const userFullName = userData.fullName ?? "User Name";
  const userEmail = userData.email ?? null;
  const userId = userData._id ?? null;
  const userProfilePic = userData.profilePic ?? null;

  // Additional fields from your provided payload
  const Phone = userData.phone ?? null;
  const University = userData.university ?? null;
  const Role = userData.role ?? "Participant";
  const IsActive = userData.isActive ?? null;
  const PaymentStatus = userData.payment_status ?? false;
  const IsEmailVerified = userData.isEmailVerified ?? false;
  const CreatedAt = userData.createdAt ?? null;

  const initials = userFullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className=" px-10 pt-20  md:p-24 space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {userFullName}! 👋</h2>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your conference registration and activities.
        </p>
      </div>

   

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                <AvatarImage src={userProfilePic || "/user-avatar.png"} alt={userFullName} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">{userFullName}</h3>
              <p className="text-sm text-muted-foreground">
                {userEmail ? `@${userEmail.split("@")[0]}` : "@username"}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium break-all">{userEmail ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{Phone ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">University</p>
                  <p className="text-sm font-medium">{University ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium">
                    {CreatedAt
                      ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(CreatedAt))
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="text-sm font-medium font-mono">{userId ?? "—"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration & Payment Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Registration & Payment</CardTitle>
            <CardDescription>Complete your conference registration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {PaymentStatus ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                  <CheckCircle2 className="h-24 w-24 text-green-600" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-green-600">Payment Completed!</h3>
                <p className="mt-2 text-muted-foreground text-center max-w-md">
                  Your registration payment has been successfully processed. You're all set for the conference!
                </p>
                <Badge variant="default" className="mt-4 bg-green-600">
                  Registration Confirmed
                </Badge>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6 px-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <XCircle className="h-16 w-16 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold text-orange-900">Payment Pending</h3>
                  <p className="mt-2 text-muted-foreground text-center max-w-md">
                    Complete your registration payment to confirm your attendance at the conference.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Next Steps:</h4>
                  <div className="grid gap-3">
                    <Button asChild className="w-full h-auto py-4" size="lg">
                      <Link href="/registration-fees" className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div className="flex-1 text-left">
                          <div className="font-semibold">Complete Payment</div>
                          <div className="text-xs opacity-90">View fees and pay now</div>
                        </div>
                      </Link>
                    </Button>

                    <Button  asChild variant="outline" className="w-full h-auto py-4 hidden" size="lg">
                      <Link href="/submission" className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <div className="flex-1 text-left">
                          <div  className="font-semibold">Submit Your Paper</div>
                          <div className="text-xs opacity-70">Upload your research paper</div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
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
      </Card>
    </div>
  );
}
