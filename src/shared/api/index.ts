import axios from "axios";
import { createApiClient } from "@b1nd/api-client";

const REQUEST_TIMEOUT_MS = 10_000;

function createConfiguredApiClient() {
  const previousTimeout = axios.defaults.timeout;

  // ponytail: @b1nd/api-client@1.0.2 has no timeout option; configure its Axios instance until it exposes one.
  axios.defaults.timeout = REQUEST_TIMEOUT_MS;

  try {
    return createApiClient(process.env.NEXT_PUBLIC_API_URL!, {
      onRefreshFailed: () => {
        if (typeof window !== "undefined") {
          if (window.location.pathname === "/authorize") return;

          const redirectUrl = encodeURIComponent(window.location.href);
          window.location.href = `https://dodam.b1nd.com/login?redirectUrl=${redirectUrl}`;
        }
      },
    });
  } finally {
    axios.defaults.timeout = previousTimeout;
  }
}

export const apiClient = createConfiguredApiClient();
