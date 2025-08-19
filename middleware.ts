// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Debug log to verify middleware runs
  console.log("Middleware executed for:", req.nextUrl.pathname);

  // Only set for document requests
  const accept = req.headers.get("accept") || "";
  const isDocument = accept.includes("text/html");

  if (isDocument) {
    // Simple security improvements
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Cache HTML lightly (tune as desired)
    res.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate=600");
  }

  return res;
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
