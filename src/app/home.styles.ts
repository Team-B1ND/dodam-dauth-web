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
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: ${breakpoints.largeDesktop}px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 40px 80px;
  ${mq.mobileOnly} { padding: 24px 20px 60px; gap: 32px; }
`;

export const Footer = styled.footer`
  max-width: ${breakpoints.largeDesktop}px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 40px;
  border-top: 1px solid ${colors.border.subtle};
  ${mq.mobileOnly} { padding: 20px; }
`;

export const FooterText = styled.p`
  font-size: 12px;
  color: ${colors.text.placeholder};
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
`;

export const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -1.08px;
  color: ${colors.text.primary};
  ${mq.mobileOnly} { font-size: 28px; }
`;

export const HeroDesc = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.text.tertiary};
`;

export const HeroAction = styled.div`
  margin-top: 8px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.text.primary};
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${colors.background.surface};
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${colors.fill.hover}; }
`;

export const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${colors.brand.primary};
  color: ${colors.static.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const CardBody = styled.div`
  min-width: 0;
`;

export const CardName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const CardDesc = styled.p`
  font-size: 14px;
  color: ${colors.text.tertiary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 0;
  background: ${colors.background.surface};
  border-radius: 14px;
`;

export const EmptyText = styled.p`
  font-size: 15px;
  color: ${colors.text.placeholder};
`;

export const DocsCard = styled.div`
  background: ${colors.brand.primary};
  border-radius: 18px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover { opacity: 0.92; }
  ${mq.mobileOnly} { padding: 24px 20px; }
`;

export const DocsLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.static.white};
  opacity: 0.8;
`;

export const DocsTitle = styled.p`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.96px;
  color: ${colors.static.white};
  ${mq.mobileOnly} { font-size: 24px; }
`;
