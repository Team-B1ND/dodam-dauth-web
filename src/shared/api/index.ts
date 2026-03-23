import axios from "axios";

export const api = axios.create({ baseURL: "/api/proxy" });

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retried) {
      return Promise.reject(error);
    }

    original._retried = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push(() => api(original).then(resolve, reject));
      });
    }

    isRefreshing = true;

    try {
      await axios.post("/api/auth/token");
      pendingRequests.forEach((cb) => cb());
      return api(original);
    } catch {
      await axios.post("/api/auth/logout").catch(() => {});
      pendingRequests.forEach((cb) => cb());
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
      pendingRequests = [];
    }
  }
);

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});
