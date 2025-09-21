import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth/auth-cookies';
import authEndpoints from '@/constants/api/auth/auth.endpoints';
import { getAPI } from '@/lib/api/http-methods';

  
export async function POST() {
  try {
    const rawResponse = await getAPI(authEndpoints.logout);
    if (!rawResponse.ok) {
      return NextResponse.json({ error: 'Unable to logout' }, { status: 400 });
    }

    await clearAuthCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
