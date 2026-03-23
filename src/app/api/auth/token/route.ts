import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies, clearAuthCookies } from "@/shared/server/cookies";
import { exchangeToken } from "@/shared/server/oauth";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("dauth_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "refresh_token이 없습니다." }, { status: 401 });
  }

  const result = await exchangeToken({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  if (!result.ok) {
    const response = NextResponse.json(result.data, { status: result.status });
    clearAuthCookies(response);
    return response;
  }

  const response = NextResponse.json({ success: true });
  setAuthCookies(response, result.data);
  return response;
}
