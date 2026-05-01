import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/auth/login") ||
    req.nextUrl.pathname.startsWith("/auth/signup");

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};