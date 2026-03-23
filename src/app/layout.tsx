import type { Metadata } from "next";
import { DdsRegistry } from "@b1nd/dodam-design-system/next";
import { ClientProviders } from "@/shared/ui/ClientThemeSetter";
import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  title: "DAuth",
  description: "도담도담 OAuth 2.0 인증 서비스",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" style={{ background: "var(--dds-color-background-default)" }}>
        <DdsRegistry>
          <ClientProviders>
            {children}
          </ClientProviders>
        </DdsRegistry>
      </body>
    </html>
  );
}