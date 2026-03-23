import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { setAuthCookies } from "./cookies";
import { exchangeToken, type TokenResult } from "./oauth";

export const serverApi = axios.create({
  baseURL: env.API_URL,
  validateStatus: () => true,
});

export function createAuthApi(req: NextRequest) {
  const accessToken = req.cookies.get("dauth_access_token")?.value;
  const refreshToken = req.cookies.get("dauth_refresh_token")?.value;
  let refreshedTokens: TokenResult | null = null;

  async function request<T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const withAuth = (token?: string): AxiosRequestConfig => ({
      ...config,
      baseURL: env.API_URL,
      headers: {
        ...config.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const res = await axios.request<T>({ ...withAuth(accessToken), validateStatus: () => true });

    if (res.status === 401 && refreshToken) {
      const result = await exchangeToken({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });

      if (result.ok) {
        refreshedTokens = result.data;
        return axios.request<T>({
          ...withAuth(result.data.access_token),
          validateStatus: () => true,
        });
      }
    }

    return res;
  }

  function applyTokens(response: NextResponse) {
    if (refreshedTokens) {
      setAuthCookies(response, refreshedTokens);
    }
  }

  return { request, applyTokens };
}
