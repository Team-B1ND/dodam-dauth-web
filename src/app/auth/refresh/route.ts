import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/server/env";

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") || "";

  const res = await fetch(`${env.API_URL}/auth/refresh`, {
    method: "POST",
    headers: { Cookie: cookie },
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  res.headers.getSetCookie().forEach((c) => {
    response.headers.append("Set-Cookie", c);
  });

  return response;
}