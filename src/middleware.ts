import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is NOT authenticated, redirect to sign-in
    if (!req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      url.searchParams.set("callbackUrl", req.nextUrl.pathname); // Preserve original URL
      return NextResponse.redirect(url);
    }

    // If the user IS authenticated, continue normally
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
  }
);

// Protect all routes
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Exclude API and static files
};
