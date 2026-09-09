"use client";

import { Suspense } from "react";
import { FilledButton } from "@b1nd/dodam-design-system";
import { useAuthorizeFlow } from "@/features/auth/hooks/useAuthorizeFlow";
import * as S from "./authorize.styles";

function AuthorizeContent() {
  const { authData, error, loading, submitting, redirecting, handleConsent, retryAuthorize, redirectToLogin } = useAuthorizeFlow();

  if (loading || redirecting) {
    return <S.CenterPage><S.StatusText>로딩 중...</S.StatusText></S.CenterPage>;
  }

  if (error) {
    return (
      <S.CenterPage>
        <S.Card>
          <S.ErrorText>{error}</S.ErrorText>
          <S.ButtonGroup>
            <FilledButton role="assistive" size="medium" display="fill" onClick={retryAuthorize} buttonCustomStyle={{ height: "44px", flex: 1 }}>
              다시 시도
            </FilledButton>
            <FilledButton role="primary" size="medium" display="fill" onClick={redirectToLogin} buttonCustomStyle={{ height: "44px", flex: 1 }}>
              로그인
            </FilledButton>
          </S.ButtonGroup>
        </S.Card>
      </S.CenterPage>
    );
  }

  if (!authData) return null;

  return (
    <S.CenterPage>
      <S.Card>
        <S.Header>
          <S.AppName>{authData.clientName}</S.AppName>
          <S.Desc>이 앱이 도담도담 계정에 접근하려고 해요.</S.Desc>
        </S.Header>

        <S.ScopeSection>
          <S.ScopeTitle>요청 권한</S.ScopeTitle>
          {authData.scopes.map((s) => (
            <S.ScopeItem key={s.scopeKey}>
              <S.Check>✓</S.Check>
              <div>
                <S.ScopeKey>{s.scopeKey}</S.ScopeKey>
                <S.ScopeDesc>{s.description}</S.ScopeDesc>
              </div>
            </S.ScopeItem>
          ))}
        </S.ScopeSection>

        <S.ButtonGroup>
          <FilledButton role="assistive" size="medium" display="fill" onClick={() => handleConsent(false, authData)} disabled={submitting} buttonCustomStyle={{ height: "44px" }}>
            거부
          </FilledButton>
          <FilledButton role="primary" size="medium" display="fill" onClick={() => handleConsent(true, authData)} disabled={submitting} buttonCustomStyle={{ height: "44px" }}>
            {submitting ? "처리 중..." : "허용"}
          </FilledButton>
        </S.ButtonGroup>
      </S.Card>
    </S.CenterPage>
  );
}

export default function AuthorizePage() {
  return (
    <Suspense fallback={<S.CenterPage><S.StatusText>로딩 중...</S.StatusText></S.CenterPage>}>
      <AuthorizeContent />
    </Suspense>
  );
}
