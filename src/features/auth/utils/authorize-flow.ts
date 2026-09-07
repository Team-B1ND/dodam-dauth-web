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
