import assert from "node:assert/strict";
import test from "node:test";
import { getAuthorizeReturnUrl, getErrorMessage, isUnauthorized } from "../src/features/auth/utils/authorize-flow.ts";

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
