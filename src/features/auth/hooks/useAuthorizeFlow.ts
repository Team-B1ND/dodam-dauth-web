"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/shared/api";
import { checkLoginStatus, submitConsent } from "@/features/auth/api";
import type { AuthorizeData } from "@/entities/client/types";
import {
  getAuthorizeReturnUrl,
  getErrorMessage,
  hasAttemptedAutoConsent,
  isUnauthorized,
  markAutoConsentAttempted,
} from "@/features/auth/utils/authorize-flow";

export function useAuthorizeFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitLock = useRef(false);
  const redirectLock = useRef(false);

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
  const [redirecting, setRedirecting] = useState(false);

  const redirectToLogin = useCallback(() => {
    sessionStorage.setItem("dauth_authorize_return", getAuthorizeReturnUrl(window.location.pathname, window.location.search));
    router.replace("/login?next=__authorize__");
  }, [router]);

  const handleConsent = useCallback(
    async (approved: boolean, data: AuthorizeData) => {
      // The lock is a ref, not `submitting`: a state update is invisible to
      // clicks already queued in the same task (double click, touch + click,
      // Enter on a focused button), and one consent must issue one code.
      if (submitLock.current) return;
      submitLock.current = true;
      setSubmitting(true);
      setError("");

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

        if (redirectLock.current) return;
        redirectLock.current = true;
        setRedirecting(true);
        // replace() keeps back navigation out of a consent screen that is done,
        // and a second assignment would cancel the callback already in flight.
        window.location.replace(redirectUrl);
        // Both locks stay closed on success. Navigation is asynchronous, so
        // unlocking here would re-enable consent while the callback is running.
      } catch (err: unknown) {
        submitLock.current = false;
        setSubmitting(false);

        if (isUnauthorized(err)) {
          redirectToLogin();
          return;
        }
        setError(getErrorMessage(err));
      }
    },
    [scope, redirectToLogin]
  );

  const loadAuthorize = useCallback(async () => {
    if (redirectLock.current) return;

    setLoading(true);
    setError("");
    setAuthData(null);

    try {
      const loggedIn = await checkLoginStatus();
      if (!loggedIn) {
        redirectToLogin();
        return;
      }

      if (!clientId || !redirectUri || !scope || !state || !codeChallenge) {
        setError("필수 파라미터가 누락되었습니다.");
        return;
      }

      const res = await apiClient.get<AuthorizeData>("/oauth/authorize", {
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
      const data: AuthorizeData = res.data;
      setAuthData(data);

      // Marked before the request and never cleared, so a remount, a retry or a
      // back navigation cannot auto-issue a second code for the same state.
      if (data.consented && !hasAttemptedAutoConsent(state)) {
        markAutoConsentAttempted(state);
        await handleConsent(true, data);
      }
    } catch (err: unknown) {
      if (isUnauthorized(err)) {
        redirectToLogin();
        return;
      }
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [clientId, redirectUri, scope, state, codeChallenge, codeChallengeMethod, handleConsent, redirectToLogin]);

  useEffect(() => {
    void loadAuthorize();
  }, [loadAuthorize]);

  const retryAuthorize = useCallback(() => {
    void loadAuthorize();
  }, [loadAuthorize]);

  return { authData, error, loading, submitting, redirecting, handleConsent, retryAuthorize, redirectToLogin };
}
