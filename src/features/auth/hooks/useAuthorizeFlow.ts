"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { publicApi } from "@/shared/api";
import { checkLoginStatus, submitConsent } from "@/features/auth/api";
import type { AuthorizeData } from "@/entities/client/types";

export function useAuthorizeFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoConsentDone = useRef(false);

  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const scope = searchParams.get("scope");
  const state = searchParams.get("state");
  const codeChallenge = searchParams.get("code_challenge");
  const codeChallengeMethod = searchParams.get("code_challenge_method") || "S256";

  const [authData, setAuthData] = useState<AuthorizeData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const redirectToLogin = useCallback(() => {
    sessionStorage.setItem("dauth_authorize_return", window.location.pathname + window.location.search);
    router.replace("/login?next=__authorize__");
  }, [router]);

  const handleConsent = useCallback(
    async (approved: boolean, data: AuthorizeData) => {
      setSubmitting(true);
      try {
        const redirectUrl = await submitConsent({
          clientId: data.clientId,
          redirectUri: data.redirectUri,
          scope: scope!,
          state: data.state,
          codeChallenge: data.codeChallenge,
          codeChallengeMethod: data.codeChallengeMethod,
          approved,
        });
        window.location.href = redirectUrl;
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          redirectToLogin();
          return;
        }
        setError(axios.isAxiosError(err) && err.response?.data?.message ? err.response.data.message : "서버에 연결할 수 없습니다.");
        setSubmitting(false);
      }
    },
    [scope, redirectToLogin]
  );

  useEffect(() => {
    (async () => {
      try {
        const loggedIn = await checkLoginStatus();
        if (!loggedIn) { redirectToLogin(); return; }
      } catch {
        redirectToLogin();
        return;
      }

      if (!clientId || !redirectUri || !scope || !state || !codeChallenge) {
        setError("필수 파라미터가 누락되었습니다.");
        setLoading(false);
        return;
      }

      try {
        const res = await publicApi.get("/oauth/authorize", {
          params: {
            response_type: "code",
            client_id: clientId,
            redirect_uri: redirectUri,
            scope,
            state,
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod,
          },
        });
        const data: AuthorizeData = res.data.data;
        setAuthData(data);

        if (data.consented && !autoConsentDone.current) {
          autoConsentDone.current = true;
          await handleConsent(true, data);
          return;
        }
      } catch (err: unknown) {
        setError(axios.isAxiosError(err) && err.response?.data?.message ? err.response.data.message : "서버에 연결할 수 없습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [clientId, redirectUri, scope, state, codeChallenge, codeChallengeMethod, handleConsent, redirectToLogin]);

  return { authData, error, loading, submitting, handleConsent };
}
