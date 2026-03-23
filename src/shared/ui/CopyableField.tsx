"use client";

import { colors, useToast } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

interface CopyableFieldProps {
  label: string;
  value: string;
  warning?: string;
}

export function CopyableField({ label, value, warning }: CopyableFieldProps) {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} 복사됨`, { position: "top" });
  };

  return (
    <Section>
      <Label>{label}</Label>
      <Row>
        <Value>{value}</Value>
        <CopyBtn onClick={handleCopy}>복사</CopyBtn>
      </Row>
      {warning && <Warning>{warning}</Warning>}
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.tertiary};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${colors.fill.primary};
  border-radius: 8px;
  padding: 10px 12px;
`;

const Value = styled.code`
  flex: 1;
  font-size: 13px;
  color: ${colors.text.primary};
  word-break: break-all;
`;

const CopyBtn = styled.button`
  all: unset;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.brand.primary};
  cursor: pointer;
  flex-shrink: 0;
`;

const Warning = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.status.error};
`;
