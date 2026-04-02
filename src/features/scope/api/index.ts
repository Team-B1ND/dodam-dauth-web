import { apiClient } from "@/shared/api";
import type { ScopeInfo } from "@/entities/client/types";

export async function getScopes(): Promise<ScopeInfo[]> {
  const data = await apiClient.get<ScopeInfo[]>("/oauth/clients/scopes");
  return data.data;
}
