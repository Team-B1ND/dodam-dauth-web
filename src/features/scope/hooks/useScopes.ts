import { useQuery } from "@tanstack/react-query";
import { getScopes } from "@/features/scope/api";

export function useScopes() {
  return useQuery({
    queryKey: ["scopes"],
    queryFn: getScopes,
  });
}
