import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/features/client/api";
import type { ClientInfo } from "@/entities/client/types";

async function fetchMyApps(): Promise<ClientInfo[]> {
  const ids: string[] = JSON.parse(localStorage.getItem("dauth_client_ids") || "[]");
  if (ids.length === 0) return [];
  const results = await Promise.allSettled(ids.map(getClient));
  return results
    .filter((r): r is PromiseFulfilledResult<ClientInfo> => r.status === "fulfilled")
    .map((r) => r.value);
}

export function useMyApps(enabled: boolean) {
  return useQuery({
    queryKey: ["client", "myApps"],
    queryFn: fetchMyApps,
    enabled,
  });
}
