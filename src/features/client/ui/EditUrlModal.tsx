"use client";

import { useState } from "react";
import { FilledButton, FilledTextField, useToast } from "@b1nd/dodam-design-system";
import { updateClient } from "@/features/client/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import type { ClientInfo } from "@/entities/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalTitle, ButtonRow, FieldColumn } from "@/shared/ui/ModalParts";

interface Props extends OverlayControllerProps {
  app: ClientInfo;
  onUpdated: (updated: ClientInfo) => void;
}

export function EditUrlModal({ app, onUpdated, ...overlayProps }: Props) {
  const { close } = overlayProps;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [websiteUrl, setWebsiteUrl] = useState(app.websiteUrl || "");
  const [redirectUri, setRedirectUri] = useState(app.redirectUris[0] || "");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!redirectUri.trim()) { toast.error("리다이렉트 URL을 입력하세요.", { position: "top" }); return; }
    const uri = redirectUri.trim();
    const isLocalhost = uri.startsWith("http://localhost") || uri.startsWith("http://127.0.0.1");
    if (!isLocalhost && !uri.startsWith("https://")) { toast.error("리다이렉트 URL은 HTTPS여야 해요. (localhost 제외)", { position: "top" }); return; }
    if (!secret.trim()) { toast.error("Client Secret을 입력하세요.", { position: "top" }); return; }
    setLoading(true);
    try {
      const updated = await updateClient(app.clientId, secret.trim(), {
        clientName: app.clientName,
        redirectUris: [redirectUri.trim()],
        scopes: app.scopes,
        websiteUrl: websiteUrl.trim() || undefined,
        description: app.description || undefined,
        logoUrl: app.logoUrl || undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["client", "myApps"] });
      onUpdated(updated);
      toast.success("URL이 수정되었어요.", { position: "top" });
      close();
    } catch {
      toast.error("수정에 실패했어요. Secret을 확인하세요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...overlayProps}>
      <ModalTitle>URL 설정</ModalTitle>
      <FieldColumn>
        <FilledTextField type="text" label="메인 URL" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder={app.websiteUrl || "https://example.com"} supportingText="서비스의 메인 페이지 URL을 입력해 주세요." maxLength={512} />
        <FilledTextField type="text" label="리다이렉트 URL" value={redirectUri} onChange={(e) => setRedirectUri(e.target.value)} placeholder={app.redirectUris[0] || "https://example.com/verify"} supportingText="로그인 이후 리다이렉트 될 페이지의 URL을 입력해 주세요." required maxLength={512} />
      </FieldColumn>
      <FilledTextField type="password" label="Client Secret (인증용)" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="수정하려면 Secret을 입력하세요" required />
      <ButtonRow>
        <FilledButton role="assistive" size="medium" display="fill" onClick={close} buttonCustomStyle={{ height: "48px" }}>취소</FilledButton>
        <FilledButton role="primary" size="medium" display="fill" onClick={handleSubmit} disabled={loading} buttonCustomStyle={{ height: "48px" }}>
          {loading ? "저장 중..." : "완료"}
        </FilledButton>
      </ButtonRow>
    </ModalShell>
  );
}
