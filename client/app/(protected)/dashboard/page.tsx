import { cookies } from "next/headers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COOKIE_KEYS } from "@/lib/cookies";
import { TiTick } from "react-icons/ti";
import { BsCashCoin } from "react-icons/bs";

/**
 * Helper function to safely parse and decode cookie values.
 */
const getCookieValue = async (cookieStore: ReturnType<typeof cookies>, name: string): Promise<any> => {
  const c = (await cookieStore).get(name);
  if (!c) return null;

  const raw = c.value;
  try {
    return JSON.parse(raw);
  } catch {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
};

export default async function DashboardPage() {
  // Read cookies on server side
  const cookieStore = cookies();

  // If you store the whole user object under a single cookie key (e.g. "user")
  const userCookieKey = ((COOKIE_KEYS?.USER as any)?.DATA as string) ?? "user";
  const userData = (await getCookieValue(cookieStore, userCookieKey)) ?? {};

  // Normalize possible field names from your stored user object
  const userFullName =
    userData.fullName ??
    null;

  const userEmail =
    userData.email ?? null;

  const userId =
    userData._id ?? null;

  const userToken =
    userData.user_token ?? userData.token ?? userData.authToken ?? null;

  const userProfilePic =
    userData.profilePic ??
    null;

  // Additional fields from your provided payload
  const Phone = userData.phone ?? null;
  const University = userData.university ?? null;
  const Role = userData.role ?? null;
  const IsActive =
    userData.isActive ?? null;
  const PaymentStatus =
    userData.payment_status ?? null;
  const IsEmailVerified =
    userData.isEmailVerified ?? null;
  const CreatedAt =
    userData.createdAt ?? null;


  // Keep the raw object if you need to access any other fields dynamically
  const rawUserData = userData;

  const maskedToken =
    typeof userToken === "string"
      ? `${userToken.slice(0, 10)}...${userToken.slice(-6)}`
      : userToken;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-24 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Profile Section */}
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex flex-col items-center">
            <img
              src={userProfilePic || "/user-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-100 mb-4 object-center"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {userFullName ?? "User Name"}
            </h2>

            <p className="text-gray-500">
              {userEmail ? `@${userEmail.split("@")[0]}` : "@username"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              📍 {University} • Joined  {CreatedAt
                ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(CreatedAt))
                : "—"}  </p>
            <div className="flex justify-center gap-2">
              {/* {PaymentStatus ? (<p className="text-green-700 font-semibold border-2 border-green-700 rounded-full text-xs my-2 py-1 px-2">Paid</p>) : (<p className="text-red-700 font-semibold  border-2 border-red-700 rounded-full text-xs my-2 py-1 px-2">Unpaid</p>)} */}
              <p className="text-white text-center font-semibold bg-green-700 flex justify-center items-center rounded-full text-xs my-2 py-1 px-2"> <TiTick/>{IsEmailVerified ? "Verified" : "Unverified"}</p></div>


          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Information</h3>
            <div className="space-y-1">

              <p className="text-sm text-gray-600">🆔 ID: {userId ?? "—"}</p>
              <p className="text-sm text-gray-600">
                📧 {userEmail ?? "Hello@adalahreza.com"}
              </p>
              <p className="text-sm text-gray-600">📞 Phone: {Phone ?? "—"}</p>


            </div>
          </div>
        </div>

        {/* Right Registration Section */}
        <Card className="md:col-span-2 ">
          <div>
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Registration Payment Status
              </h2>
              {PaymentStatus ? (
                <div className="flex items-center justify-center my-4">
                  <img src="/paid.png" alt="Paid" className="w-48 h-48 object-contain" />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4 my-2">
                  <img src="/unpaid.png" alt="Unpaid" className="w-48 h-48 object-contain" />
                  <div aria-hidden className="h-24 w-px bg-green-500 rounded" />
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-lg flex items-center gap-2">
                    <BsCashCoin /> Pay Now
                  </Button>
                </div>

              )}

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
