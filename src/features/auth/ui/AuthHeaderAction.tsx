"use client";

import { useRouter } from "next/navigation";
import { colors, FilledButton, Avatar } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMyProfile } from "@/features/user/hooks/useMyProfile";

export function AuthHeaderAction() {
  const router = useRouter();
  const { data: loggedIn, isLoading } = useAuth();
  const { data: profile } = useMyProfile(!!loggedIn);

  if (isLoading) return null;

  if (loggedIn) {
    return (
      <ProfileButton onClick={() => router.push("/profile")}>
        {profile?.profileImage ? <ProfileImg src={profile.profileImage} /> : <Avatar size={32} />}
        {profile && <Name>{profile.name}</Name>}
      </ProfileButton>
    );
  }

  return (
    <FilledButton role="primary" size="small" display="inline" onClick={() => router.push("/login")} buttonCustomStyle={{}}>
      로그인
    </FilledButton>
  );
}

const ProfileButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 14px 4px 4px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${colors.fill.hover}; }
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.text.primary};
`;
