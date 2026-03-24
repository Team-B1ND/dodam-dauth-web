"use client";

import { useState } from "react";
import { FilledButton, FilledTextField, FileInput, useToast } from "@b1nd/dodam-design-system";
import { registerClient } from "@/features/client/api";
import { uploadFile } from "@/features/file/api";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import { useQueryClient } from "@tanstack/react-query";
import { ModalShell } from "@/shared/ui/Modal";
import { ModalTitle, ButtonRow, DescArea, FieldLabel } from "@/shared/ui/ModalParts";
import { ScopeSelector } from "@/shared/ui/ScopeSelector";
import { CopyableField } from "@/shared/ui/CopyableField";

type Step = "info" | "logo" | "scope" | "result";

export function RegisterServiceModal(props: OverlayControllerProps) {
  const { close } = props;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>("info");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(new Set(["profile:read"]));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ clientId: string; clientSecret: string } | null>(null);

  const handleLogoChange = async (file: File | null) => {
    setLogoFile(file);
    if (!file) { setLogoUrl(""); return; }
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setLogoUrl(url);
      toast.success("로고가 업로드되었어요.", { position: "top" });
    } catch {
      toast.error("로고 업로드에 실패했어요.", { position: "top" });
      setLogoFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleNext = () => {
    if (!clientName.trim()) { toast.error("서비스명을 입력하세요.", { position: "top" }); return; }
    if (clientName.trim().length < 2) { toast.error("서비스명은 2자 이상이어야 해요.", { position: "top" }); return; }
    if (clientName.trim().length > 100) { toast.error("서비스명은 100자 이하여야 해요.", { position: "top" }); return; }
    if (!redirectUri.trim()) { toast.error("리다이렉트 URL을 입력하세요.", { position: "top" }); return; }
    const uri = redirectUri.trim();
    const isLocalhost = uri.startsWith("http://localhost") || uri.startsWith("http://127.0.0.1");
    if (!isLocalhost && !uri.startsWith("https://")) { toast.error("리다이렉트 URL은 HTTPS여야 해요. (localhost 제외)", { position: "top" }); return; }
    setStep("logo");
  };

  const handleSubmit = async () => {
    if (selectedScopes.size === 0) { toast.error("권한을 최소 1개 선택하세요.", { position: "top" }); return; }
    setLoading(true);
    try {
      const data = await registerClient({
        clientName: clientName.trim(),
        redirectUris: [redirectUri.trim()],
        scopes: Array.from(selectedScopes),
        websiteUrl: websiteUrl.trim() || undefined,
        description: description.trim() || undefined,
        logoUrl: logoUrl.trim() || undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["client", "myApps"] });
      setResult(data);
      setStep("result");
    } catch {
      toast.error("서비스 등록에 실패했어요.", { position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell {...props}>
      {step === "info" && (
        <>
          <ModalTitle>서비스 등록하기</ModalTitle>
          <FilledTextField type="text" label="서비스명" placeholder="DAuth Service" value={clientName} onChange={(e) => setClientName(e.target.value)} required minLength={2} maxLength={100} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <FieldLabel>설명</FieldLabel>
            <DescArea placeholder="서비스의 설명을 입력하세요.." value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} />
          </div>
          <FilledTextField type="text" label="메인 URL" placeholder="https://example.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} maxLength={512} />
          <FilledTextField type="text" label="리다이렉트 URL" placeholder="https://example.com/verify" value={redirectUri} onChange={(e) => setRedirectUri(e.target.value)} required maxLength={512} />
          <ButtonRow>
            <FilledButton role="assistive" size="medium" display="fill" onClick={close} buttonCustomStyle={{ height: "48px" }}>취소</FilledButton>
            <FilledButton role="primary" size="medium" display="fill" onClick={handleNext} buttonCustomStyle={{ height: "48px" }}>다음</FilledButton>
          </ButtonRow>
        </>
      )}

      {step === "logo" && (
        <>
          <ModalTitle>서비스 로고</ModalTitle>
          <FileInput
            label="로고 이미지"
            accept="image/*"
            value={logoFile}
            onChange={handleLogoChange}
            supportingText={uploading ? "업로드 중..." : logoUrl ? "업로드 완료" : "선택 사항이에요"}
            isDisabled={uploading}
          />
          <ButtonRow>
            <FilledButton role="assistive" size="medium" display="fill" onClick={() => setStep("info")} buttonCustomStyle={{ height: "48px" }}>이전</FilledButton>
            <FilledButton role="primary" size="medium" display="fill" onClick={() => setStep("scope")} disabled={uploading} buttonCustomStyle={{ height: "48px" }}>다음</FilledButton>
          </ButtonRow>
        </>
      )}

      {step === "scope" && (
        <>
          <ModalTitle>권한 설정</ModalTitle>
          <ScopeSelector selected={selectedScopes} onChange={setSelectedScopes} />
          <ButtonRow>
            <FilledButton role="assistive" size="medium" display="fill" onClick={() => setStep("logo")} buttonCustomStyle={{ height: "48px" }}>이전</FilledButton>
            <FilledButton role="primary" size="medium" display="fill" onClick={handleSubmit} disabled={loading} buttonCustomStyle={{ height: "48px" }}>
              {loading ? "등록 중..." : "완료"}
            </FilledButton>
          </ButtonRow>
        </>
      )}

      {step === "result" && result && (
        <>
          <ModalTitle>서비스 등록 완료</ModalTitle>
          <CopyableField label="Client ID" value={result.clientId} />
          <CopyableField label="Client Secret" value={result.clientSecret} warning="이 값은 다시 볼 수 없어요. 반드시 지금 복사하세요." />
          <ButtonRow>
            <FilledButton role="primary" size="medium" display="fill" onClick={close} buttonCustomStyle={{ height: "48px" }}>확인</FilledButton>
          </ButtonRow>
        </>
      )}
    </ModalShell>
  );
}
