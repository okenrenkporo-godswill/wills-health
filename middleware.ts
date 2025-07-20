import { NextRequest, NextResponse } from "next/server";

// Routes that are public
const PUBLIC_ROUTES = ["/login", "/register"];
const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/user/dashboard";

export function middleware(req: NextRequest) {
  // 🔐 Get JWT from cookie
  const token = req.cookies.get("Token")?.value;
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isProtected = pathname.startsWith("/user");

  // 1️⃣ If trying to access protected route without JWT, redirect to login
  if (isProtected && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.searchParams.set("redirect", pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // 2️⃣ If logged in and visiting login/register, redirect to dashboard
  if (token && isPublic) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = DASHBOARD_PATH;
    return NextResponse.redirect(dashboardUrl);
  }

  // ✅ Otherwise allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/login", "/register"],
};
