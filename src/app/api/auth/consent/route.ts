import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/shared/server/api";

export async function POST(request: NextRequest) {
  const dodamToken = request.cookies.get("dauth_dodam_token")?.value;

  if (!dodamToken) {
    return NextResponse.json({ error: "dodam_token_expired" }, { status: 401 });
  }

  const body = await request.json();

  const res = await serverApi.post("/oauth/authorize/consent", body, {
    headers: { Authorization: `Bearer ${dodamToken}` },
  });

  return NextResponse.json(res.data, { status: res.status });
}
