export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  DAUTH_URL: process.env.NEXT_PUBLIC_DAUTH_URL || "http://localhost:3000",
  ACCESS_TOKEN_NAME: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "local_access_token",
  REFRESH_TOKEN_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "local_refresh_token",
} as const;