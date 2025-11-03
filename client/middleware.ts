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
    const userToken = request.cookies.get("use_token")?.value;
    const adminToken = request.cookies.get("adminToken")?.value;
    
    if (pathname.startsWith("/admin")) {
      if (!adminToken) {
        const adminSignInUrl = new URL("/adminSignin", request.url);
        return NextResponse.redirect(adminSignInUrl);
      }
    }
    else if (pathname.startsWith("/dashboard")) {
      if (!userToken) {
        const signInUrl = new URL("/login", request.url);
        return NextResponse.redirect(signInUrl);
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
