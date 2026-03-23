"use client";

import { useState } from "react";
import { FilledButton, FilledTextField, useToast } from "@b1nd/dodam-design-system";
import { transferOwnership } from "@/features/client/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import type { ClientInfo } from "@/entities/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalTitle, ButtonRow } from "@/shared/ui/ModalParts";

interface Props extends OverlayControllerProps {
  app: ClientInfo;
  onUpdated: (updated: ClientInfo) => void;
}

export function TransferOwnerModal({ app, onUpdated, ...overlayProps }: Props) {
  const { close } = overlayProps;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [newOwnerId, setNewOwnerId] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newOwnerId.trim()) { toast.error("도담 아이디를 입력하세요.", { position: "top" }); return; }
    if (!secret.trim()) { toast.error("Client Secret을 입력하세요.", { position: "top" }); return; }
    setLoading(true);
    try {
      const updated = await transferOwnership(app.clientId, secret.trim(), newOwnerId.trim());
      queryClient.invalidateQueries({ queryKey: ["client", "myApps"] });
      onUpdated(updated);
      toast.success("서비스 주인이 변경되었어요.", { position: "top" });
      close();
    } catch {
      toast.error("변경에 실패했어요. Secret과 아이디를 확인하세요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...overlayProps}>
      <ModalTitle>서비스 주인 설정</ModalTitle>
      <FilledTextField type="text" label="도담아이디" value={newOwnerId} onChange={(e) => setNewOwnerId(e.target.value)} placeholder="아이디로 설정..." required />
      <FilledTextField type="password" label="Client Secret (인증용)" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="변경하려면 Secret을 입력하세요" required />
      <ButtonRow>
        <FilledButton role="assistive" size="medium" display="fill" onClick={close} buttonCustomStyle={{ height: "48px" }}>취소</FilledButton>
        <FilledButton role="primary" size="medium" display="fill" onClick={handleSubmit} disabled={loading} buttonCustomStyle={{ height: "48px" }}>
          {loading ? "변경 중..." : "완료"}
        </FilledButton>
      </ButtonRow>
    </ModalShell>
  );
}
