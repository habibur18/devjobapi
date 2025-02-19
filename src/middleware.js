import { NextResponse } from "next/server";

export function middleware(req) {
  // console.log(req);
  const res = NextResponse.next();
  //console.log(req);
  // console.log(res);
  console.log(`Middleware for ${req.url}`);
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

// Apply middleware to API routes
export const config = {
  matcher: "/api/:path*",
};
