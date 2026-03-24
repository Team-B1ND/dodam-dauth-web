"use client";

import { Suspense } from "react";
import { colors, FilledButton, TextButton, Avatar, BarChart, Gear, useOverlay } from "@b1nd/dodam-design-system";
import { useProfilePage } from "@/features/client/hooks/useProfilePage";
import { RegisterServiceModal } from "@/features/client/ui/RegisterServiceModal";
import { EditInfoModal } from "@/features/client/ui/EditInfoModal";
import { EditUrlModal } from "@/features/client/ui/EditUrlModal";
import { EditScopeModal } from "@/features/client/ui/EditScopeModal";
import { TransferOwnerModal } from "@/features/client/ui/TransferOwnerModal";
import { ClientIdModal } from "@/features/client/ui/ClientIdModal";
import { DeleteServiceModal } from "@/features/client/ui/DeleteServiceModal";
import { AppHeader } from "@/shared/ui/Header";
import * as S from "./profile.styles";

function ProfileContent() {
  const { loggedIn, authLoading, profile, myApps, activeApp, setSelectedApp, joinDate } = useProfilePage();
  const overlay = useOverlay();

  if (authLoading || loggedIn === false) return null;

  return (
    <S.Page>
      <AppHeader />
      <S.Main>
        <S.ContentGrid>
          <S.LeftColumn>
            <S.ProfileCard>
              {profile?.profileImage ? <S.LargeImg src={profile.profileImage} /> : <Avatar size={160} />}
              <S.ProfileInfo>
                <S.Username>{profile?.username || "-"}</S.Username>
                <S.InfoList>
                  <S.InfoRow><S.ProfileLabel>등록한 서비스</S.ProfileLabel><S.InfoValue>{myApps.length}</S.InfoValue></S.InfoRow>
                  <S.InfoRow><S.ProfileLabel>가입일자</S.ProfileLabel><S.InfoValue>{joinDate}</S.InfoValue></S.InfoRow>
                </S.InfoList>
              </S.ProfileInfo>
            </S.ProfileCard>
            <FilledButton role="primary" size="large" display="fill" onClick={() => overlay.open((props) => <RegisterServiceModal {...props} />)} buttonCustomStyle={{ height: "48px", flex: "none" }}>
              새로운 서비스 등록하기
            </FilledButton>
          </S.LeftColumn>

          <S.MiddleColumn>
            <S.SectionHead><BarChart size={28} /><S.SectionTitle>내가 등록한 서비스</S.SectionTitle></S.SectionHead>
            {myApps.length > 0 ? (
              <S.AppList>
                {myApps.map((app) => (
                  <S.AppItem key={app.clientId} onClick={() => setSelectedApp(app)} $active={activeApp?.clientId === app.clientId}>
                    <S.AppName $active={activeApp?.clientId === app.clientId}>{app.clientName}</S.AppName>
                  </S.AppItem>
                ))}
              </S.AppList>
            ) : (
              <S.EmptyCard><S.EmptyText>등록한 서비스가 없습니다.</S.EmptyText></S.EmptyCard>
            )}
          </S.MiddleColumn>

          <S.RightColumn>
            <S.SectionHead><Gear size={28} color={colors.text.primary} /><S.SectionTitle>서비스 상세 정보</S.SectionTitle></S.SectionHead>
            {activeApp ? (
              <>
                <S.ClickableInfoCard onClick={() => overlay.open((props) => <EditInfoModal {...props} app={activeApp} onUpdated={setSelectedApp} />)}>
                  <S.InfoCardInner>
                    <S.InfoBlock><S.InfoLabel>서비스명</S.InfoLabel><S.InfoTitle>{activeApp.clientName}</S.InfoTitle></S.InfoBlock>
                    {activeApp.description && <S.InfoBlock><S.InfoLabel>설명</S.InfoLabel><S.InfoDesc>{activeApp.description}</S.InfoDesc></S.InfoBlock>}
                  </S.InfoCardInner>
                  <S.ChevronRight>›</S.ChevronRight>
                </S.ClickableInfoCard>

                <S.ClickableInfoCard onClick={() => overlay.open((props) => <EditUrlModal {...props} app={activeApp} onUpdated={setSelectedApp} />)}>
                  <S.InfoCardInner>
                    <S.InfoBlock><S.InfoLabel>메인 URL</S.InfoLabel><S.InfoText>{activeApp.websiteUrl || "-"}</S.InfoText></S.InfoBlock>
                    <S.InfoBlock><S.InfoLabel>리다이렉트 URL</S.InfoLabel><S.InfoText>{activeApp.redirectUris.join(", ")}</S.InfoText></S.InfoBlock>
                  </S.InfoCardInner>
                  <S.ChevronRight>›</S.ChevronRight>
                </S.ClickableInfoCard>

                <S.ClickableInfoCard onClick={() => overlay.open((props) => <EditScopeModal {...props} app={activeApp} onUpdated={setSelectedApp} />)}>
                  <S.InfoBlock><S.InfoLabel>권한</S.InfoLabel><S.InfoText>{activeApp.scopes.join(", ")}</S.InfoText></S.InfoBlock>
                  <S.ChevronRight>›</S.ChevronRight>
                </S.ClickableInfoCard>

                <S.ClickableInfoCard onClick={() => overlay.open((props) => <ClientIdModal {...props} app={activeApp} />)}>
                  <S.InfoBlock><S.InfoLabel>Client ID</S.InfoLabel><S.InfoText>{activeApp.clientId}</S.InfoText></S.InfoBlock>
                  <S.ChevronRight>›</S.ChevronRight>
                </S.ClickableInfoCard>

                <S.InfoRow2>
                  <S.InfoCardSmall><S.InfoLabel>서비스 등록일</S.InfoLabel><S.InfoText>{activeApp.createdAt ? new Date(activeApp.createdAt).toLocaleDateString("ko-KR") : "-"}</S.InfoText></S.InfoCardSmall>
                  <S.ClickableInfoCard onClick={() => overlay.open((props) => <TransferOwnerModal {...props} app={activeApp} onUpdated={setSelectedApp} />)}>
                    <S.InfoBlock><S.InfoLabel>서비스 주인</S.InfoLabel><S.InfoText>{profile?.username || "-"}</S.InfoText></S.InfoBlock>
                    <S.ChevronRight>›</S.ChevronRight>
                  </S.ClickableInfoCard>
                </S.InfoRow2>

                <TextButton size="large" onClick={() => overlay.open((props) => <DeleteServiceModal {...props} app={activeApp} onDeleted={() => setSelectedApp(null)} />)} buttonCustomStyle={{ color: colors.status.error }}>
                  서비스 삭제
                </TextButton>
              </>
            ) : (
              <S.EmptyDetailCard><S.EmptyDetailText>상세 정보를 표시할 서비스가 없습니다.</S.EmptyDetailText></S.EmptyDetailCard>
            )}
          </S.RightColumn>
        </S.ContentGrid>

        <S.PageFooter>
          <S.Divider />
          <S.FooterInner>
            <S.FooterInfo><span>B1ND(바인드)</span><span>대구소프트웨어마이스터고등학교</span><span>이메일 : mdev_team@dgsw.hs.kr</span></S.FooterInfo>
            <S.FooterLinks>
              <S.FooterGroup><S.FooterLink>DOCS</S.FooterLink><S.FooterLink>서비스</S.FooterLink><S.FooterLink>블로그</S.FooterLink></S.FooterGroup>
              <S.FooterGroup><S.FooterLink>도담도담</S.FooterLink><S.FooterLink>깃허브</S.FooterLink></S.FooterGroup>
            </S.FooterLinks>
          </S.FooterInner>
        </S.PageFooter>
      </S.Main>
    </S.Page>
  );
}

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileContent />
    </Suspense>
  );
}