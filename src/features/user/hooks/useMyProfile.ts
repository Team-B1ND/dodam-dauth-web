import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/features/user/api";

export function useMyProfile(enabled: boolean) {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getMyProfile,
    enabled,
  });
}
