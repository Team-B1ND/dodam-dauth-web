"use client";

import { Suspense } from "react";
import { colors, FilledButton } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { useAuthorizeFlow } from "@/features/auth/hooks/useAuthorizeFlow";

function AuthorizeContent() {
  const { authData, error, loading, submitting, handleConsent } = useAuthorizeFlow();

  if (loading || submitting) {
    return <CenterPage><StatusText>로딩 중...</StatusText></CenterPage>;
  }

  if (error) {
    return (
      <CenterPage>
        <Card><ErrorText>{error}</ErrorText></Card>
      </CenterPage>
    );
  }

  if (!authData) return null;

  return (
    <CenterPage>
      <Card>
        <Header>
          <AppName>{authData.clientName}</AppName>
          <Desc>이 앱이 회원님의 도담도담 계정에 접근하려고 합니다.</Desc>
        </Header>

        <ScopeSection>
          <ScopeTitle>요청 권한</ScopeTitle>
          {authData.scopes.map((s) => (
            <ScopeItem key={s.scopeKey}>
              <Check>✓</Check>
              <div>
                <ScopeKey>{s.scopeKey}</ScopeKey>
                <ScopeDesc>{s.description}</ScopeDesc>
              </div>
            </ScopeItem>
          ))}
        </ScopeSection>

        <ButtonGroup>
          <FilledButton role="assistive" size="medium" display="fill" onClick={() => handleConsent(false, authData)} disabled={submitting} buttonCustomStyle={{ height: "44px" }}>
            거부
          </FilledButton>
          <FilledButton role="primary" size="medium" display="fill" onClick={() => handleConsent(true, authData)} disabled={submitting} buttonCustomStyle={{ height: "44px" }}>
            {submitting ? "처리 중..." : "허용"}
          </FilledButton>
        </ButtonGroup>
      </Card>
    </CenterPage>
  );
}

export default function AuthorizePage() {
  return (
    <Suspense fallback={<CenterPage><StatusText>로딩 중...</StatusText></CenterPage>}>
      <AuthorizeContent />
    </Suspense>
  );
}

const CenterPage = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${colors.background.default};
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  border-radius: 16px;
  background: ${colors.background.surface};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AppName = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.text.primary};
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${colors.text.tertiary};
`;

const ScopeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScopeTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.text.secondary};
`;

const ScopeItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  background: ${colors.fill.primary};
  padding: 10px 12px;
`;

const Check = styled.span`
  color: ${colors.brand.primary};
  font-weight: 700;
  margin-top: 1px;
`;

const ScopeKey = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

const ScopeDesc = styled.p`
  font-size: 12px;
  color: ${colors.text.tertiary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StatusText = styled.p`
  color: ${colors.text.placeholder};
`;

const ErrorText = styled.p`
  font-weight: 600;
  color: ${colors.status.error};
  text-align: center;
`;
