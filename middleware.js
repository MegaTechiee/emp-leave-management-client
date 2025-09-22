import { NextResponse } from 'next/server';
import { getAuthCookie } from './lib/auth/auth-cookies';
import { getCookieServer } from './utils/cookies/server-cookies';
import { authUIPaths, appTabsUIPaths, roleRoutes } from './constants/literals/ui-paths';

export const middleware = async (req) => {
  const token = await getAuthCookie(req); // auth token
  const role = await getCookieServer('role'); // 'admin' or 'employee'
  const { pathname } = req.nextUrl;

  // Public routes
  const authPublicRoutes = [authUIPaths.login, authUIPaths.empSignup, authUIPaths.adminSignup];
  const isAuthPublicRoute = authPublicRoutes.some((route) => pathname.startsWith(route));

  // Root redirect
  if (pathname === '/') {
    return NextResponse.redirect(new URL(token ? appTabsUIPaths.dashboard : authUIPaths.login, req.url));
  }

  // Authenticated users should not see auth public routes
  if (token && isAuthPublicRoute) {
    return NextResponse.redirect(new URL(appTabsUIPaths.dashboard, req.url));
  }

  // Protect all private routes
  if (!token && !isAuthPublicRoute) {
    return NextResponse.redirect(new URL(authUIPaths.login, req.url));
  }

  // Role-based access
  if (token && pathname.startsWith('/dashboard')) {
    if (role === 'admin' && !roleRoutes.admin.includes(pathname)) {
      return NextResponse.redirect(new URL(appTabsUIPaths.empDetails, req.url));
    }
    if (role === 'employee' && !roleRoutes.employee.includes(pathname)) {
      return NextResponse.redirect(new URL(appTabsUIPaths.applyLeave, req.url));
    }
  }

  // Allow through
  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/dashboard/:path*', '/users/:path*', '/login', '/emp-signup', '/admin-signup'],
};
