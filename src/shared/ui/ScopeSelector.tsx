"use client";

import { colors, Checkbox, mq } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { useScopes } from "@/features/scope/hooks/useScopes";

interface ScopeSelectorProps {
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}

export function ScopeSelector({ selected, onChange }: ScopeSelectorProps) {
  const { data: scopes = [] } = useScopes();

  const toggle = (key: string) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange(next);
  };

  return (
    <Grid>
      {scopes.map((scope) => (
        <Item key={scope.scopeKey} onClick={() => toggle(scope.scopeKey)}>
          <Checkbox size="small" selected={selected.has(scope.scopeKey)} />
          <Label>{scope.description}</Label>
        </Item>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  ${mq.mobileOnly} { grid-template-columns: 1fr; }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.44px;
  color: ${colors.text.primary};
  user-select: none;
`;
