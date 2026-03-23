import { NextResponse } from "next/server";

const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

export function setAuthCookies(
  response: NextResponse,
  tokens: { access_token: string; refresh_token: string; expires_in: number },
) {
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("dauth_access_token", tokens.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in,
  });

  response.cookies.set("dauth_refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_MAX_AGE,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("dauth_access_token");
  response.cookies.delete("dauth_refresh_token");
}
