import axios from "axios";

export const api = axios.create({ baseURL: "/api/proxy" });

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});
