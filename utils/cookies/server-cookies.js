import { cookies } from "next/headers";

export const setCookieServer = async ({ name, value, maxAgeSeconds = 60*60*1, path = "/", httpOnly = false, secure = false, sameSite = "lax", domain }) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    maxAge: maxAgeSeconds,
    path,
    httpOnly,
    secure,
    sameSite,
    domain,
  });
};

export const clearCookieServer = async ({ name, path = "/", domain }) => {
  const cookieStore = await cookies();
  cookieStore.delete({
    name,
    path,
    domain,
  });
};

export const getCookieServer = async (name, req) => {
  if (req) {
    // Middleware usage
    return req.cookies.get(name)?.value || null;
  }

  // Server components / API routes
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
};
