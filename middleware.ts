import { NextRequest, NextResponse } from "next/server";

// Define public routes
const publicRoutes = ["/login", "/register"];

// Middleware logic
export function middleware(req: NextRequest) {
  const token = req.cookies.get("Token")?.value;
  const { pathname } = req.nextUrl;

  // Check if path is under /user (protected)
  const isProtectedRoute = pathname.startsWith("/user");

  // Redirect to login if not authenticated
  if (isProtectedRoute && !token) {
    // If already on /login, don't redirect again
    if (pathname !== "/login") {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to dashboard if authenticated but on login/register
  const isPublicRoute = publicRoutes.includes(pathname);
  if (token && isPublicRoute) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/user/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Apply to only these routes
export const config = {
  matcher: ["/user/:path*", "/login", "/register"],
};
