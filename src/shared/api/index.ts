import { createApiClient } from "@b1nd/api-client";

export const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL!, {
  onRefreshFailed: () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://dodam.b1nd.com/login?redirectUrl=https://dauth.b1nd.com";
    }
  },
});