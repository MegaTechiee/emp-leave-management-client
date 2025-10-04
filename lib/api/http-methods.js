import authEndpoints from "@/constants/api/auth/auth.endpoints";
import { getAuthCookie } from "@/lib/auth/auth-cookies";

const getBaseHeaders = async (endpoint) => {
  const token = await getAuthCookie();
  const base = {
    "Content-Type": "application/json",
  };

  // Add header for all except login
  if (token && !endpoint.includes(authEndpoints.login)) {
    base["Authorization"] = `Bearer ${token}`;
  }

  return base;
};

/**
 * Makes an API request to the specified endpoint with the given method and body.
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param endpoint - API endpoint to call
 * @param body - Request body for POST/PUT requests
 * @param options - Additional options for the request
 * @returns Response from the API
 */

export const getAPI = async (endpoint, options) => {
  try {
    const baseHeaders = await getBaseHeaders(endpoint);
    const mergedHeaders = {
      ...baseHeaders,
      ...(options?.headers || {}),
    };

    const res = await fetch(endpoint, {
      method: "GET",
      headers: mergedHeaders,
      ...options,
    });

    return res;
  } catch (error) {
    console.error("GET API error:", error);
    throw error;
  }
};

export const postAPI = async (
  endpoint,
  body,
  options
) => {
  try {
    console.log('endpoint in post api', endpoint);
    console.log('body in post api', body);
    const baseHeaders = await getBaseHeaders(endpoint);
    const mergedHeaders = {
      ...baseHeaders,
      ...(options?.headers || {}),
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: mergedHeaders,
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...options,
    });
    console.log('response from post api', res);
    console.log('response status from post api', res.status);
    return res;
  } catch (error) {
    console.error("http-methods: POST API error:", error);
    throw error;
  }
};

// export const putAPI = async (
//   endpoint,
//   body,
//   options
// ) => {
//   const res = await fetch(endpoint, {
//     method: "PUT",
//     headers: headers(),
//     body: JSON.stringify(body),
//     ...options,
//   });

//   return res;
// };

// export const deleteAPI = async (endpoint, options) => {
//   const res = await fetch(endpoint, {
//     method: "DELETE",
//     headers: headers(),
//     ...options,
//   });

//   return res;
// };
