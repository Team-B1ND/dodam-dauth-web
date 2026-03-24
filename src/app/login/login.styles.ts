import { colors } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${colors.background.default};
`;

export const Card = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  border-radius: 12px;
  padding: 12px;
  background: ${colors.background.surface};
`;

export const ImageSection = styled.div`
  position: relative;
  width: 400px;
  height: 500px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 12px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
`;

export const ImageText = styled.div`
  position: absolute;
  left: 40px;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BrandTitle = styled.span`
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1.92px;
  color: ${colors.brand.primary};
`;

export const SubTitle = styled.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.48px;
  color: ${colors.static.white};
`;

export const FormSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 24px 32px;
`;

export const Heading = styled.h1`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.84px;
  color: ${colors.text.primary};
`;

export const BrandSpan = styled.span`
  color: ${colors.brand.primary};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HintText = styled.p`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.28px;
  color: ${colors.text.tertiary};
`;

export const HintLink = styled.span`
  color: ${colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
`;

export const BottomText = styled.p`
  position: fixed;
  bottom: 84px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.28px;
  color: ${colors.text.placeholder};
`;

export const BottomLink = styled.span`
  color: ${colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
`;

export const LoadingText = styled.p`
  color: ${colors.text.placeholder};
`;
