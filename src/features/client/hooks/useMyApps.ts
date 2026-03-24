import { useQuery } from "@tanstack/react-query";
import { getMyClients } from "@/features/client/api";

export function useMyApps(enabled: boolean) {
  return useQuery({
    queryKey: ["client", "myApps"],
    queryFn: getMyClients,
    enabled,
  });
}
