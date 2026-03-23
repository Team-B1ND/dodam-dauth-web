"use client";

import { useState } from "react";
import { FilledButton, FilledTextField, useToast } from "@b1nd/dodam-design-system";
import { updateClient } from "@/features/client/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import type { ClientInfo } from "@/entities/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalTitle, ButtonRow, DescArea, FieldLabel } from "@/shared/ui/ModalParts";

interface Props extends OverlayControllerProps {
  app: ClientInfo;
  onUpdated: (updated: ClientInfo) => void;
}

export function EditInfoModal({ app, onUpdated, ...overlayProps }: Props) {
  const { close } = overlayProps;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [clientName, setClientName] = useState(app.clientName);
  const [description, setDescription] = useState(app.description || "");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!clientName.trim()) { toast.error("서비스명을 입력하세요.", { position: "top" }); return; }
    if (clientName.trim().length < 2) { toast.error("서비스명은 2자 이상이어야 해요.", { position: "top" }); return; }
    if (!secret.trim()) { toast.error("Client Secret을 입력하세요.", { position: "top" }); return; }
    setLoading(true);
    try {
      const updated = await updateClient(app.clientId, secret.trim(), {
        clientName: clientName.trim(),
        redirectUris: app.redirectUris,
        scopes: app.scopes,
        websiteUrl: app.websiteUrl || undefined,
        description: description.trim() || undefined,
        logoUrl: app.logoUrl || undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["client", "myApps"] });
      onUpdated(updated);
      toast.success("기본 정보가 수정되었어요.", { position: "top" });
      close();
    } catch {
      toast.error("수정에 실패했어요. Secret을 확인하세요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...overlayProps}>
      <ModalTitle>기본 정보 설정</ModalTitle>
      <FilledTextField type="text" label="서비스명" value={clientName} onChange={(e) => setClientName(e.target.value)} required minLength={2} maxLength={100} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <FieldLabel>설명</FieldLabel>
        <DescArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={app.description || "서비스의 설명을 입력하세요.."} maxLength={500} />
      </div>
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
