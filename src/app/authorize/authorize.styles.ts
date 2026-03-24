import { colors } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const CenterPage = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${colors.background.default};
`;

export const Card = styled.div`
  width: 100%;
  max-width: 380px;
  border-radius: 16px;
  background: ${colors.background.surface};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AppName = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.text.primary};
`;

export const Desc = styled.p`
  font-size: 14px;
  color: ${colors.text.tertiary};
`;

export const ScopeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ScopeTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.text.secondary};
`;

export const ScopeItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  background: ${colors.fill.primary};
  padding: 10px 12px;
`;

export const Check = styled.span`
  color: ${colors.brand.primary};
  font-weight: 700;
  margin-top: 1px;
`;

export const ScopeKey = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const ScopeDesc = styled.p`
  font-size: 12px;
  color: ${colors.text.tertiary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const StatusText = styled.p`
  color: ${colors.text.placeholder};
`;

export const ErrorText = styled.p`
  font-weight: 600;
  color: ${colors.status.error};
  text-align: center;
`;
