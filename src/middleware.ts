import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminSession } from '@/app/admin/login/actions'; // Assuming actions.ts is at this path

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths to protect under /admin
  const protectedAdminPaths = [
    '/admin/dashboard',
    '/admin/new-post',
    // Add any other admin paths here that need protection
  ];

  const isAccessingProtectedAdminPath = protectedAdminPaths.some(path => pathname.startsWith(path));

  if (isAccessingProtectedAdminPath) {
    const isAuthenticated = await getAdminSession();

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      // Preserve search params if any, e.g., for a ?redirectUrl=
      const loginUrl = new URL('/admin/login', request.url);
      // loginUrl.searchParams.set('redirectUrl', pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // If trying to access /admin or /admin/ and is authenticated, redirect to /admin/dashboard
  if ((pathname === '/admin' || pathname === '/admin/')) {
    const isAuthenticated = await getAdminSession();
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
      // If not authenticated and trying to access /admin or /admin/, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
  ],
}; 