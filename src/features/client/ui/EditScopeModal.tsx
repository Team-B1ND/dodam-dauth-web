"use client";

import { useState } from "react";
import { FilledButton, FilledTextField, useToast } from "@b1nd/dodam-design-system";
import { updateClient } from "@/features/client/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import type { ClientInfo } from "@/entities/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalTitle, ButtonRow } from "@/shared/ui/ModalParts";
import { ScopeSelector } from "@/shared/ui/ScopeSelector";

interface Props extends OverlayControllerProps {
  app: ClientInfo;
  onUpdated: (updated: ClientInfo) => void;
}

export function EditScopeModal({ app, onUpdated, ...overlayProps }: Props) {
  const { close } = overlayProps;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(new Set(app.scopes));
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedScopes.size === 0) { toast.error("권한을 최소 1개 선택하세요.", { position: "top" }); return; }
    if (!secret.trim()) { toast.error("Client Secret을 입력하세요.", { position: "top" }); return; }
    setLoading(true);
    try {
      const updated = await updateClient(app.clientId, secret.trim(), {
        clientName: app.clientName,
        redirectUris: app.redirectUris,
        scopes: Array.from(selectedScopes),
        websiteUrl: app.websiteUrl || undefined,
        description: app.description || undefined,
        logoUrl: app.logoUrl || undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["client", "myApps"] });
      onUpdated(updated);
      toast.success("권한이 수정되었어요.", { position: "top" });
      close();
    } catch {
      toast.error("수정에 실패했어요. Secret을 확인하세요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...overlayProps}>
      <ModalTitle>권한 설정</ModalTitle>
      <ScopeSelector selected={selectedScopes} onChange={setSelectedScopes} />
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
