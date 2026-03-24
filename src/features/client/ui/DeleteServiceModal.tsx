"use client";

import { useState } from "react";
import { colors, FilledButton, FilledTextField, useToast } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { deactivateClient } from "@/features/client/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import type { ClientInfo } from "@/entities/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalErrorTitle, ButtonRow } from "@/shared/ui/ModalParts";

interface Props extends OverlayControllerProps {
  app: ClientInfo;
  onDeleted: () => void;
}

export function DeleteServiceModal({ app, onDeleted, ...overlayProps }: Props) {
  const { close } = overlayProps;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [secret, setSecret] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [loading, setLoading] = useState(false);

  const canDelete = confirmName === app.clientName && secret.trim().length > 0;

  const handleDelete = async () => {
    if (!canDelete) return;
    setLoading(true);
    try {
      await deactivateClient(app.clientId, secret.trim());
      queryClient.invalidateQueries({ queryKey: ["client", "myApps"] });
      toast.success("서비스가 삭제되었어요.", { position: "top" });
      onDeleted();
      close();
    } catch {
      toast.error("삭제에 실패했어요. Secret을 확인하세요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...overlayProps}>
      <ModalErrorTitle>서비스 삭제</ModalErrorTitle>
      <WarningText>이 작업은 되돌릴 수 없어요. 삭제하면 해당 서비스로 발급된 모든 토큰이 무효화돼요.</WarningText>
      <ConfirmText>삭제하려면 서비스명 <strong>{app.clientName}</strong>을 입력하세요.</ConfirmText>
      <FilledTextField type="text" label="서비스명 확인" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} placeholder={app.clientName} />
      <FilledTextField type="password" label="Client Secret" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Secret을 입력하세요" required />
      <ButtonRow>
        <FilledButton role="assistive" size="medium" display="fill" onClick={close} buttonCustomStyle={{ height: "48px" }}>취소</FilledButton>
        <FilledButton role="negative" size="medium" display="fill" onClick={handleDelete} disabled={!canDelete || loading} buttonCustomStyle={{ height: "48px" }}>
          {loading ? "삭제 중..." : "삭제"}
        </FilledButton>
      </ButtonRow>
    </ModalShell>
  );
}

const WarningText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.status.error};
  line-height: 1.5;
`;

const ConfirmText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text.secondary};
  line-height: 1.5;
`;
