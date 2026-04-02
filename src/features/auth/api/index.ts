import { apiClient } from "@/shared/api";

export async function checkLoginStatus(): Promise<boolean> {
  try {
    await apiClient.get("/user/me");
    return true;
  } catch {
    return false;
  }
}

export async function login(username: string, password: string): Promise<void> {
  await apiClient.post("/auth/login", { username, password });
}

export async function submitConsent(body: {
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  approved: boolean;
}): Promise<string> {
  const data = await apiClient.post<{ redirectUri: string }>("/oauth/authorize/consent", body);
  return data.data.redirectUri;
}
