import { publicApi } from "@/shared/api";
import type { ScopeInfo } from "@/entities/client/types";

export async function getScopes(): Promise<ScopeInfo[]> {
  const { data } = await publicApi.get("/oauth/clients/scopes");
  return data.data;
}
