import { apiClient } from "@/shared/api";
import { isUnauthorized } from "@/features/auth/utils/authorize-flow";

export async function checkLoginStatus(): Promise<boolean> {
  try {
    await apiClient.get("/user/me");
    return true;
  } catch (error) {
    if (isUnauthorized(error)) return false;
    throw error;
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
