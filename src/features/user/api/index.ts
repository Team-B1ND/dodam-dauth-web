import { apiClient } from "@/shared/api";
import type { UserProfile } from "@/entities/user/types";

export async function getMyProfile(): Promise<UserProfile> {
  const data = await apiClient.get<UserProfile>("/user/me");
  return data.data;
}
