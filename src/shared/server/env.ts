export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  DAUTH_URL: process.env.NEXT_PUBLIC_DAUTH_URL || "http://localhost:3000",
  CLIENT_ID: process.env.NEXT_PUBLIC_DAUTH_CLIENT_ID || "",
  CLIENT_SECRET: process.env.DAUTH_CLIENT_SECRET || "",
} as const;
