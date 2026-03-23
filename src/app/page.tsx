"use client";

import { useRouter } from "next/navigation";
import { FilledButton, TextButton, BarChart, useOverlay } from "@b1nd/dodam-design-system";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMyApps } from "@/features/client/hooks/useMyApps";
import { RegisterServiceModal } from "@/features/client/ui/RegisterServiceModal";
import { AppHeader } from "@/shared/ui/Header";
import * as S from "./home.styles";

export default function HomePage() {
  const router = useRouter();
  const { data: loggedIn, isLoading: authLoading } = useAuth();
  const { data: myApps = [] } = useMyApps(!!loggedIn);
  const overlay = useOverlay();

  if (authLoading) return null;

  return (
    <S.Page>
      <AppHeader />

      <S.Main>
        <S.Hero>
          <S.HeroTitle>도담도담 계정 하나로,<br />모든 서비스를 연결하세요.</S.HeroTitle>
          <S.HeroDesc>DAuth는 도담도담 OAuth 2.0 인증 서비스예요.</S.HeroDesc>
          {!loggedIn && (
            <S.HeroAction>
              <FilledButton role="primary" size="large" display="inline" onClick={() => router.push("/login")} buttonCustomStyle={{ padding: "0 40px" }}>
                시작하기
              </FilledButton>
            </S.HeroAction>
          )}
        </S.Hero>

        {loggedIn && (
          <S.Section>
            <S.SectionHeader>
              <S.SectionLeft>
                <BarChart size={22} />
                <S.SectionTitle>내가 등록한 서비스</S.SectionTitle>
              </S.SectionLeft>
              <TextButton size="small" onClick={() => overlay.open((props) => <RegisterServiceModal {...props} />)} buttonCustomStyle={{}}>
                + 새 앱
              </TextButton>
            </S.SectionHeader>
            {myApps.length > 0 ? (
              <S.CardList>
                {myApps.map((app) => (
                  <S.Card key={app.clientId} onClick={() => router.push(`/profile?app=${app.clientId}`)}>
                    <S.CardIcon>{app.clientName[0]}</S.CardIcon>
                    <S.CardBody>
                      <S.CardName>{app.clientName}</S.CardName>
                      <S.CardDesc>{app.description || app.websiteUrl || "설명 없음"}</S.CardDesc>
                    </S.CardBody>
                  </S.Card>
                ))}
              </S.CardList>
            ) : (
              <S.Empty>
                <S.EmptyText>아직 등록한 앱이 없어요</S.EmptyText>
                <FilledButton role="primary" size="medium" display="inline" onClick={() => overlay.open((props) => <RegisterServiceModal {...props} />)} buttonCustomStyle={{}}>
                  첫 앱 등록하기
                </FilledButton>
              </S.Empty>
            )}
          </S.Section>
        )}

        <S.DocsCard>
          <S.DocsLabel>DAuth 사용법을 알고 싶다면?</S.DocsLabel>
          <S.DocsTitle>DAuth Docs ↗︎</S.DocsTitle>
        </S.DocsCard>
      </S.Main>

      <S.Footer>
        <S.FooterText>B1ND(바인드) · 대구소프트웨어마이스터고등학교</S.FooterText>
      </S.Footer>
    </S.Page>
  );
}
