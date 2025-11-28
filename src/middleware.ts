import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function middleware(req: NextRequest) {
  console.log("Middleware URL:", req.nextUrl.href);
  console.log("Incoming headers:", Object.fromEntries(req.headers.entries()));
  const cookieHeader = req.headers.get("cookie");
  console.log("Cookie header:", cookieHeader);
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/", "/bookings", "/messages"];
  const authRoutes = ["/login"];

  let isLoggedIn = false;

  try {
    const res = await fetch(`${API_URL}/auth/check-session`, {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
      cache: "no-store",
    });
    console.log("Middleware check-session response status:", res.status);
    isLoggedIn = res.status === 200;
  } catch {
    isLoggedIn = false;
  }

  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) {
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  if (authRoutes.some((r) => pathname.startsWith(r))) {
    if (isLoggedIn) {
      if (pathname !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/bookings", "/login", "/messages"],
};
