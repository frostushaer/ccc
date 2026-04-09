import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const role = token?.role as "ADMIN" | "CLIENT" | "EMPLOYEE" | undefined
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    const roleHome =
      role === "ADMIN"
        ? "/admin"
        : role === "EMPLOYEE"
          ? "/employee"
          : role === "CLIENT"
            ? "/client"
            : "/dashboard"

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(roleHome, req.url))
      }

      return null
    }

    if (isAuth && req.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL(roleHome, req.url))
    }

    if (isAuth && req.nextUrl.pathname.startsWith("/employee") && role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL(roleHome, req.url))
    }

    if (isAuth && req.nextUrl.pathname.startsWith("/client") && role !== "CLIENT") {
      return NextResponse.redirect(new URL(roleHome, req.url))
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/admin/:path*",
    "/employee/:path*",
    "/client/:path*",
    "/login",
    "/register",
  ],
}
