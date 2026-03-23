import { api } from "@/shared/api";
import type { UserProfile } from "@/entities/user/types";

export async function getMyProfile(): Promise<UserProfile> {
  const { data } = await api.get("/user/me");
  return data.data;
}
