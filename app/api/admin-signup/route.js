import { NextResponse } from 'next/server';
// import { setAuthCookie } from '@/lib/auth/auth-cookies';
import { postAPI } from '@/lib/api/http-methods';
import authEndpoints from '@/constants/api/auth/auth.endpoints';
import { genericErrorMessage } from '@/constants/literals/messages';

export async function POST(req) {
  try {
    const { email, name, password, role } = await req.json();

    const rawResponse = await postAPI(authEndpoints.signup, { email, name, password, role });

    const result = await rawResponse.json();
    console.log('result from admin signup api', result);
    if (result.success) {
      const token = result.data.token;
      // Use your helper to set cookie
      // await setAuthCookie(token);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(result, { status: result.status });
    }
  } catch (error) {
    console.log('route.ts => Signup error:', error);
    return NextResponse.json({ error: { message: genericErrorMessage } }, { status: 500 });
  }
}
