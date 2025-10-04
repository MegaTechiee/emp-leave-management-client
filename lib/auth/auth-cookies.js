import { AUTH_COOKIE_NAME } from '@/constants/cookies/cookies';
import { isProduction } from '@/utils/env';
import { cookies } from 'next/headers';

const cookieDomain = isProduction() ? process.env.COOKIE_DOMAIN : undefined;

export const setAuthCookie = async (token) => {

  const cookieStore = await cookies();
  cookieStore.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: isProduction(),
    domain: cookieDomain,
    secure: isProduction(),
    sameSite: isProduction() ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 0.5, // half-an-hour
  });
};

export const clearAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: AUTH_COOKIE_NAME,
    domain: cookieDomain,
    path: '/',
  });
};

//Get auth token from cookies.
// Works in both Middleware (pass req) and server components (no req).
export const getAuthCookie = async (req) => {
  if (req) {
    // Middleware usage
    return req.cookies.get(AUTH_COOKIE_NAME)?.value || null;
  }

  // Server components / API routes
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value || null;
}