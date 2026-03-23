import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("dauth_access_token")?.value;
  const refreshToken = request.cookies.get("dauth_refresh_token")?.value;
  return NextResponse.json({ loggedIn: !!(accessToken || refreshToken) });
}