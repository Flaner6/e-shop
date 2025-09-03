// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = { matcher: ["/:path*"] }; // match everything while testing

export function middleware(request: NextRequest) {
  // hard proof: respond directly to this path
  if (request.nextUrl.pathname === "/middleware-ping") {
    return NextResponse.json({ ok: true, via: "middleware" }, { status: 200 });
  }

  // otherwise pass through with a debug header
  const res = NextResponse.next();
  res.headers.set("x-mw", `hit:${request.nextUrl.pathname}`);
  return res;
}
