import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/server/env";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(env.ACCESS_TOKEN_NAME)?.value;
  const refreshToken = request.cookies.get(env.REFRESH_TOKEN_NAME)?.value;
  return NextResponse.json({ loggedIn: !!(accessToken || refreshToken) });
}