const env = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

// Environment variable validation
export const getEnv = (key) => {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const API_BASE_URL = getEnv("NEXT_PUBLIC_API_BASE_URL");