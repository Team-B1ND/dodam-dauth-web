import assert from "node:assert/strict";
import test from "node:test";
import {
  clearAutoConsentAttempt,
  getAuthorizeReturnUrl,
  getErrorMessage,
  getAutoConsentKey,
  hasAttemptedAutoConsent,
  isUnauthorized,
  markAutoConsentAttempted,
} from "../src/features/auth/utils/authorize-flow.ts";

test("preserves the authorize path and query when returning from login", () => {
  assert.equal(
    getAuthorizeReturnUrl("/authorize", "?client_id=client&redirect_uri=https%3A%2F%2Fapp.test%2Fcallback&state=state"),
    "/authorize?client_id=client&redirect_uri=https%3A%2F%2Fapp.test%2Fcallback&state=state"
  );
});

test("recognizes Axios and API-client unauthorized errors", () => {
  assert.equal(isUnauthorized({ response: { status: 401 } }), true);
  assert.equal(isUnauthorized({ status: 401 }), true);
  assert.equal(isUnauthorized({ response: { status: 500 } }), false);
});

test("returns actionable timeout and server messages", () => {
  assert.equal(getErrorMessage({ code: "ECONNABORTED" }), "요청 시간이 초과되었습니다. 다시 시도해주세요.");
  assert.equal(getErrorMessage({ response: { data: { message: "잠시 후 다시 시도해주세요." } } }), "잠시 후 다시 시도해주세요.");
});

const transaction = {
  clientId: "client-a",
  redirectUri: "https://app.test/callback",
  scope: "profile",
  state: "state-a",
  codeChallenge: "challenge-a",
  codeChallengeMethod: "S256",
};

test("marks auto consent per transaction so a remount cannot issue a second code", () => {
  assert.equal(hasAttemptedAutoConsent(transaction), false);

  markAutoConsentAttempted(transaction);

  assert.equal(hasAttemptedAutoConsent(transaction), true);
  assert.equal(hasAttemptedAutoConsent({ ...transaction, state: "state-b" }), false);
});

test("a reused state with a new client or challenge is a separate transaction", () => {
  markAutoConsentAttempted(transaction);

  assert.equal(hasAttemptedAutoConsent({ ...transaction, clientId: "client-b" }), false);
  assert.equal(hasAttemptedAutoConsent({ ...transaction, codeChallenge: "challenge-b" }), false);
  assert.equal(hasAttemptedAutoConsent({ ...transaction, redirectUri: "https://other.test/callback" }), false);
  assert.equal(hasAttemptedAutoConsent({ ...transaction, scope: "profile email" }), false);
});

test("keeps fields apart so a value containing the separator cannot collide", () => {
  assert.notEqual(
    getAutoConsentKey({ ...transaction, clientId: "a|b", redirectUri: "c" }),
    getAutoConsentKey({ ...transaction, clientId: "a", redirectUri: "b|c" })
  );
});

test("releases the mark when an attempt ends without a redirect", () => {
  markAutoConsentAttempted(transaction);
  assert.equal(hasAttemptedAutoConsent(transaction), true);

  clearAutoConsentAttempt(transaction);

  assert.equal(hasAttemptedAutoConsent(transaction), false);
});

test("releasing one transaction leaves another transaction's mark intact", () => {
  const other = { ...transaction, clientId: "client-b" };
  markAutoConsentAttempted(transaction);
  markAutoConsentAttempted(other);

  clearAutoConsentAttempt(transaction);

  assert.equal(hasAttemptedAutoConsent(transaction), false);
  assert.equal(hasAttemptedAutoConsent(other), true);
});
