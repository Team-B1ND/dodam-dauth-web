import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/shared/server/cookies";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}
