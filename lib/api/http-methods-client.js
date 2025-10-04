'use client';

import { getCookieValueClient } from '../../utils/cookies/client-cookies';
import { AUTH_COOKIE_NAME } from '@/constants/cookies/cookies';
import { isProduction } from '@/utils/env';

const getBaseHeaders = async () => {

  if (isProduction()) {
    // In production, rely on credentials: 'include' to handle cookies
    return {
      "Content-Type": "application/json",
    };
  } else {
    // In development, manually read the token from the cookie
    const freshToken = getCookieValueClient(AUTH_COOKIE_NAME);
    const token = decodeURIComponent(freshToken || "");

    // console.log("Decoded token:", token);
    // console.log("AUTH_COOKIE_NAME:", AUTH_COOKIE_NAME);
    // console.log("document.cookie:", document.cookie);
    // console.log("Client http token:", token);

    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  }
};

export const getAPIClient = async (endpoint, options) => {
  try {
    // Client-side: browser automatically includes cookies 
    // credentials to 'include'
    const baseHeaders = await getBaseHeaders();
    const mergedHeaders = {
      ...baseHeaders,
      ...(options?.headers || {}),
    };

    const res = await fetch(endpoint, {
      method: "GET",
      headers: mergedHeaders,
      credentials: 'include', // very important for sending cookies with request
      ...options,
    });

    return res;
  } catch (error) {
    console.error("GET API error (client) :", error);
    throw error;
  }
};


export const postAPIClient = async (
  endpoint,
  body,
  options
) => {
  try {
    // Client-side: browser automatically includes cookies 
    // credentials to 'include'
    const baseHeaders = await getBaseHeaders();
    const mergedHeaders = {
      ...baseHeaders,
      ...(options?.headers || {}),
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: mergedHeaders,
      ...(body ? { body: JSON.stringify(body) } : {}),
      credentials: 'include', // very important for sending cookies with request
      ...options,
    });

    return res;
  } catch (error) {
    console.error('http-methods-client: POST API error (client):', error);
    throw error;
  }
};

export const patchAPIClient = async (
  endpoint,
  body,
  options
) => {
  try {
    // Client-side: browser automatically includes cookies 
    // credentials to 'include'
    const baseHeaders = await getBaseHeaders();
    const mergedHeaders = {
      ...baseHeaders,
      ...(options?.headers || {}),
    };

    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: mergedHeaders,
      ...(body ? { body: JSON.stringify(body) } : {}),
      credentials: 'include', // very important for sending cookies with request
      ...options,
    });

    return res;
  } catch (error) {
    console.error('http-methods-client: PATCH API error (client):', error);
    throw error;
  }
};