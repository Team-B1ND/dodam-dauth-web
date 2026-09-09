function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isUnauthorized(error: unknown) {
  if (!isRecord(error)) return false;

  const response = isRecord(error.response) ? error.response : undefined;
  return response?.status === 401 || error.status === 401;
}

export function getErrorMessage(error: unknown) {
  if (!isRecord(error)) return "서버에 연결할 수 없습니다. 다시 시도해주세요.";

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return "요청 시간이 초과되었습니다. 다시 시도해주세요.";
  }

  const response = isRecord(error.response) ? error.response : undefined;
  const responseData = response && isRecord(response.data) ? response.data : undefined;

  if (typeof responseData?.message === "string") return responseData.message;
  if (typeof error.message === "string") return error.message;

  return "서버에 연결할 수 없습니다. 다시 시도해주세요.";
}

export function getAuthorizeReturnUrl(pathname: string, search: string) {
  return pathname + search;
}

const AUTO_CONSENT_STORAGE_PREFIX = "dauth_auto_consent:";
const attemptedAutoConsents = new Set<string>();

export interface AutoConsentTransaction {
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
}

// The key covers every parameter that makes an authorization request distinct.
// `state` alone would leak across transactions: a client that reuses the same
// state in the same tab with a new client id or PKCE challenge is a different
// exchange and must still auto-consent. Encoding each part keeps a value that
// contains the separator from colliding with a neighbouring field.
export function getAutoConsentKey(transaction: AutoConsentTransaction) {
  return [
    transaction.clientId,
    transaction.redirectUri,
    transaction.scope,
    transaction.state,
    transaction.codeChallenge,
    transaction.codeChallengeMethod,
  ]
    .map(encodeURIComponent)
    .join("|");
}

export function hasAttemptedAutoConsent(transaction: AutoConsentTransaction) {
  const key = getAutoConsentKey(transaction);
  if (attemptedAutoConsents.has(key)) return true;

  try {
    return sessionStorage.getItem(AUTO_CONSENT_STORAGE_PREFIX + key) !== null;
  } catch {
    return false;
  }
}

export function markAutoConsentAttempted(transaction: AutoConsentTransaction) {
  const key = getAutoConsentKey(transaction);
  attemptedAutoConsents.add(key);

  try {
    sessionStorage.setItem(AUTO_CONSENT_STORAGE_PREFIX + key, "1");
  } catch {
    // Storage can be blocked; the module-scoped set still covers remounts.
  }
}
