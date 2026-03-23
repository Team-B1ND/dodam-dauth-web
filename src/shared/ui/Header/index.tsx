"use client";

import { useRouter } from "next/navigation";
import { colors, breakpoints, mq } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { AuthHeaderAction } from "@/features/auth/ui/AuthHeaderAction";

export function AppHeader() {
  const router = useRouter();

  return (
    <HeaderWrap>
      <HeaderInner>
        <Logo onClick={() => router.push("/")}>:DAuth</Logo>
        <AuthHeaderAction />
      </HeaderInner>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  background: transparent;
`;

const HeaderInner = styled.div`
  max-width: ${breakpoints.largeDesktop}px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mq.mobileOnly} { padding: 16px 20px; }
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.brand.primary};
  cursor: pointer;
`;
