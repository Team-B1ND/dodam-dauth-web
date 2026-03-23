import { colors, breakpoints, mq } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.background.default};
`;

export const Main = styled.main`
  flex: 1;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: ${breakpoints.largeDesktop}px;
  width: 100%;
  margin: 0 auto;
  ${mq.mobileOnly} { padding: 16px 20px; }
`;

export const ContentGrid = styled.div`
  display: flex;
  gap: 20px;
  min-height: 600px;
  ${mq.tabletDown} {
    flex-direction: column;
    min-height: auto;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 280px;
  flex-shrink: 0;
  ${mq.tabletDown} { width: 100%; }
`;

export const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 280px;
  flex-shrink: 0;
  ${mq.tabletDown} { width: 100%; }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

export const ProfileCard = styled.div`
  background: ${colors.background.surface};
  border-radius: 12px;
  padding: 24px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LargeImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 999px;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Username = styled.p`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.84px;
  color: ${colors.text.primary};
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProfileLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.text.secondary};
`;

export const InfoValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.text.primary};
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.44px;
  color: ${colors.text.secondary};
`;

export const AppList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AppItem = styled.div<{ $active: boolean }>`
  background: ${({ $active }) => $active ? colors.brand.primary : colors.background.surface};
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${({ $active }) => $active ? colors.brand.primary : colors.fill.hover}; }
`;

export const AppName = styled.p<{ $active: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $active }) => $active ? colors.static.white : colors.text.primary};
`;

export const EmptyCard = styled.div`
  background: ${colors.background.surface};
  border-radius: 12px;
  padding: 48px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const InfoCardBase = styled.div`
  background: ${colors.background.surface};
  border-radius: 12px;
  height: 96px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

export const ClickableInfoCard = styled(InfoCardBase)`
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${colors.fill.hover}; }
`;

export const InfoCardSmall = styled(InfoCardBase)`
  flex-shrink: 0;
`;

export const InfoCardInner = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
`;

export const InfoRow2 = styled.div`
  display: flex;
  gap: 12px;
  & > * { flex: 1; min-width: 0; }
  ${mq.mobileOnly} { flex-direction: column; }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.15px;
  color: ${colors.text.tertiary};
`;

export const InfoTitle = styled.p`
  font-size: 22px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.44px;
  color: ${colors.text.primary};
`;

export const InfoDesc = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.2px;
  color: ${colors.text.secondary};
`;

export const InfoText = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChevronRight = styled.span`
  font-size: 24px;
  color: ${colors.text.tertiary};
  flex-shrink: 0;
  padding-left: 8px;
`;

export const EmptyDetailCard = styled.div`
  flex: 1;
  background: ${colors.background.surface};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

export const EmptyDetailText = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.text.primary};
  ${mq.mobileOnly} { font-size: 16px; }
`;

export const PageFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 72px;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${colors.border.subtle};
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  ${mq.mobileOnly} { flex-direction: column; gap: 24px; }
`;

export const FooterInfo = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: ${colors.text.placeholder};
  ${mq.mobileOnly} { flex-direction: column; gap: 4px; }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export const FooterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 144px;
`;

export const FooterLink = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.36px;
  color: ${colors.text.secondary};
  cursor: pointer;
  &:hover { color: ${colors.text.primary}; }
`;
