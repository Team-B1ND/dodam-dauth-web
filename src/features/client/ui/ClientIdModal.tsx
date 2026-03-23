"use client";

import { useState } from "react";
import { FilledButton, useToast } from "@b1nd/dodam-design-system";
import { ownerResetSecret } from "@/features/client/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import type { ClientInfo } from "@/entities/client/types";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalTitle, ButtonRow } from "@/shared/ui/ModalParts";
import { CopyableField } from "@/shared/ui/CopyableField";

interface Props extends OverlayControllerProps {
  app: ClientInfo;
}

export function ClientIdModal({ app, ...overlayProps }: Props) {
  const { close } = overlayProps;
  const toast = useToast();
  const [newSecret, setNewSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetSecret = async () => {
    setLoading(true);
    try {
      const result = await ownerResetSecret(app.clientId);
      setNewSecret(result.clientSecret);
      toast.success("Secret이 재발급되었어요.", { position: "top" });
    } catch {
      toast.error("재발급에 실패했어요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...overlayProps}>
      <ModalTitle>클라이언트 정보</ModalTitle>
      <CopyableField label="Client ID" value={app.clientId} />
      {newSecret ? (
        <CopyableField label="새 Client Secret" value={newSecret} warning="이 값은 다시 볼 수 없어요. 반드시 지금 복사하세요." />
      ) : (
        <FilledButton role="negative" size="medium" display="fill" onClick={handleResetSecret} disabled={loading} buttonCustomStyle={{ height: "48px" }}>
          {loading ? "재발급 중..." : "Secret 재발급"}
        </FilledButton>
      )}
      <ButtonRow>
        <FilledButton role="primary" size="medium" display="fill" onClick={close} buttonCustomStyle={{ height: "48px" }}>확인</FilledButton>
      </ButtonRow>
    </ModalShell>
  );
}
