import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

// Apply middleware to API routes
export const config = {
  matcher: "/api/:path*",
};
