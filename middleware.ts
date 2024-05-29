import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
}

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const openUrls = publicUrls[request.nextUrl.pathname];
  if (!session.id) {
    // not log in
    if (!openUrls) {
      // not public url
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}