import axios from "axios";

export async function checkLoginStatus(): Promise<boolean> {
  const { data } = await axios.get("/api/auth/check");
  return data.loggedIn;
}

export async function login(username: string, password: string): Promise<void> {
  await axios.post("/api/auth/login", { username, password });
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
  const { data } = await axios.post("/api/auth/consent", body);
  return data.data.redirectUri;
}

export async function refreshToken(): Promise<void> {
  await axios.post("/api/auth/token");
}
