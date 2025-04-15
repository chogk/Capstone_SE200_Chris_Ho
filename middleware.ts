// middleware.ts
import { withAuth } from "next-auth/middleware"

export function middleware(request: Request) {
    return withAuth({
      pages: {
        signIn: "/login",
      },
    })(request);
  }

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/policy_holders/:path*',
    '/policies/:path*',
    '/protected-page/:path*',
    // Add more protected paths here
  ],
}
