import { useQuery } from "@tanstack/react-query";
import { checkLoginStatus } from "@/features/auth/api";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "status"],
    queryFn: checkLoginStatus,
  });
}
