import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth/auth-cookies';
import authEndpoints from '@/constants/api/auth/auth.endpoints';
import { getAPI, postAPI } from '@/lib/api/http-methods';
import { clearCookieServer } from '@/utils/cookies/server-cookies';

export async function GET(req) {
  try {
    const rawResponse = await postAPI(authEndpoints.logout);
    if (!rawResponse.ok) {
      return NextResponse.json({ error: 'Unable to logout' }, { status: 400 });
    }

    await clearAuthCookie();
    await clearCookieServer({
      name: "role",
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    // Get origin from request headers
    const origin = req.headers.get("origin") || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    return NextResponse.redirect(`${origin}/login`);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
