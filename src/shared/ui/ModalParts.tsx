"use client";

import { colors } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.44px;
  color: ${colors.text.secondary};
`;

export const ModalErrorTitle = styled(ModalTitle)`
  color: ${colors.status.error};
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const FieldColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DescArea = styled.textarea`
  background: ${colors.background.surface};
  border: 1px solid ${colors.border.subtle};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.text.primary};
  min-height: 144px;
  resize: none;
  outline: none;
  font-family: inherit;
  &::placeholder { color: ${colors.text.tertiary}; }
  &:focus { border-color: ${colors.brand.primary}; }
`;

export const FieldLabel = styled.label`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.15px;
  color: ${colors.text.tertiary};
`;
