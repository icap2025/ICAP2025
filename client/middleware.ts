import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware to handle authentication for protected routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/admin"];

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const userToken = request.cookies.get("user_token")?.value;
    const adminToken = request.cookies.get("admin_token")?.value;

    if (pathname.startsWith("/admin")) {
      // Admin routes require admin token
      if (!adminToken) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    else if (pathname.startsWith("/dashboard")) {
      // Dashboard routes require user token
      if (!userToken) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
