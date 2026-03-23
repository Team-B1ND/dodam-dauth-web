import { env } from "./env";
import { serverApi } from "./api";

export interface TokenResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function exchangeToken(
  params: Record<string, string>,
): Promise<{ ok: true; data: TokenResult } | { ok: false; data: Record<string, unknown>; status: number }> {
  const res = await serverApi.post("/oauth/token", new URLSearchParams({
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
    ...params,
  }), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (res.status >= 400) return { ok: false, data: res.data, status: res.status };
  return { ok: true, data: res.data };
}
