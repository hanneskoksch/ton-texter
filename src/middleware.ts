import { updateSession } from "@/lib/supabase/middleware";

import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, etc)
     * - public routes (/blog/*, /pricing, /legal/*)
     */
    "/((?!_next/static|_next/image|favicon.ico|blog(?:/.*)?$|pricing$|legal(?:/.*)?$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
