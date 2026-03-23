"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeSetter } from "@b1nd/dodam-design-system/next";
import { ToastProvider, OverlayProvider, applyTheme, getStoredTheme } from "@b1nd/dodam-design-system";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 } },
  }));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) applyTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSetter />
      <ToastProvider />
      <OverlayProvider>
        {children}
      </OverlayProvider>
    </QueryClientProvider>
  );
}
