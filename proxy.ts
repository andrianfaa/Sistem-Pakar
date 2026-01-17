import { decrypt } from "@/libs/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/admin/aturan", "/admin/gejala", "/admin/penyakit", "/admin/profile"];
const publicRoutes = ["/", "/login", "/diagnosa", "/penyakit", "/tentang"];

export async function proxy(request: NextRequest) {
  // console.log("🔍 Proxy checking:", request.nextUrl.pathname);

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute) {
    if (!session) {
      console.log("⛔ Unauthorized access to protected route:", path);
      const redirectUrl = new URL("/login", request.url);
      return NextResponse.redirect(redirectUrl);
    } else {
      // console.log("✅ Authorized access to protected route:", path);
      return NextResponse.next();
    }
  }

  if (isPublicRoute) {
    if (session) {
      console.log("⛔ Authenticated user trying to access public route:", path);
      const redirectUrl = new URL("/admin", request.url);
      return NextResponse.redirect(redirectUrl);
    } else {
      // console.log("✅ Unauthenticated access to public route:", path);
      return NextResponse.next();
    }
  }

  // console.log("➡️ No specific route protection for:", path);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/", "/diagnosa", "/penyakit", "/tentang"]
};
