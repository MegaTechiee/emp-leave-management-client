'use server';

import { getAuthCookie } from "./auth-cookies"

export const isLoggedIn = async () => {
  // Logic to check if the user is logged in
  return !!(await getAuthCookie());

}