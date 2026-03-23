import { NextRequest, NextResponse } from "next/server";
import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/features/oauth/lib/pkce";
import { env } from "@/shared/server/env";
import { serverApi } from "@/shared/server/api";
import { setAuthCookies } from "@/shared/server/cookies";
import { exchangeToken } from "@/shared/server/oauth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "아이디와 비밀번호를 입력하세요." }, { status: 400 });
  }

  const loginRes = await serverApi.post("/auth/login", { username, password });

  if (loginRes.status >= 400) {
    return NextResponse.json({ message: loginRes.data.message || "로그인에 실패했습니다." }, { status: loginRes.status });
  }

  const dodamToken = loginRes.data.data.access;

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();

  const consentRes = await serverApi.post("/oauth/authorize/consent", {
    clientId: env.CLIENT_ID,
    redirectUri: `${env.DAUTH_URL}/callback`,
    scope: "profile:read",
    state,
    codeChallenge,
    codeChallengeMethod: "S256",
    approved: true,
  }, {
    headers: { Authorization: `Bearer ${dodamToken}` },
  });

  if (consentRes.status >= 400) {
    return NextResponse.json({ message: consentRes.data.message || "동의 처리에 실패했습니다." }, { status: consentRes.status });
  }

  const redirectUrl = new URL(consentRes.data.data.redirectUri);
  const code = redirectUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "authorization code를 받지 못했습니다." }, { status: 500 });
  }

  const tokenResult = await exchangeToken({
    grant_type: "authorization_code",
    code,
    redirect_uri: `${env.DAUTH_URL}/callback`,
    code_verifier: codeVerifier,
  });

  if (!tokenResult.ok) {
    return NextResponse.json(
      { message: (tokenResult.data as { error_description?: string }).error_description || "토큰 발급에 실패했습니다." },
      { status: tokenResult.status },
    );
  }

  const response = NextResponse.json({ success: true });
  setAuthCookies(response, tokenResult.data);
  return response;
}
