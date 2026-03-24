"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMyProfile } from "@/features/user/hooks/useMyProfile";
import { useMyApps } from "@/features/client/hooks/useMyApps";
import type { ClientInfo } from "@/entities/client/types";

export function useProfilePage() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get("app");
  const { data: loggedIn, isLoading: authLoading } = useAuth();
  const { data: profile } = useMyProfile(!!loggedIn);
  const { data: myApps = [] } = useMyApps(!!loggedIn);
  const [selectedApp, setSelectedApp] = useState<ClientInfo | null>(null);

  const activeApp = selectedApp
    ?? (appParam ? myApps.find((a) => a.clientId === appParam) : null)
    ?? myApps[0]
    ?? null;

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(/\.$/, ".")
    : "-";

  return { loggedIn, authLoading, profile, myApps, activeApp, setSelectedApp, joinDate };
}
