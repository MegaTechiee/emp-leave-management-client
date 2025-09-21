import { NextResponse } from 'next/server';
import { setAuthCookie } from '@/lib/auth/auth-cookies';
import {setCookieServer} from '@/utils/cookies/server-cookies';
import { postAPI, ApiErrorResponse } from '@/lib/api/http-methods';
import authEndpoints from '@/constants/api/auth/auth.endpoints';
import { genericErrorMessage } from '@/constants/literals/messages';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const rawResponse = await postAPI(authEndpoints.login, { email, password });

    const result = await rawResponse.json();
    console.log('result from login api', result);
    if (result.success) {
      const token = result.data.token;
      // Use your helper to set cookie
      await setAuthCookie(token);
      await setCookieServer({
        name: "role",
        value: result.data.role,
        secure: process.env.NODE_ENV === "production",
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(result, { status: result.status });
    }
  } catch (error) {
    console.log('route.ts => Login error:', error);
    return NextResponse.json({ error: { message: genericErrorMessage } }, { status: 500 });
  }
}
