import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/server/env";

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") || "";
  const body = await request.json();

  const res = await fetch(`${env.API_URL}/oauth/authorize/consent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}