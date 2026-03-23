"use client";

import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/features/auth/api";
import { TextField, FilledButton, colors, useToast } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import axios from "axios";

const AUTH_IMAGE = "/auth-bg.jpg";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("아이디와 비밀번호를 모두 입력하세요.", { position: "top" });
      return;
    }

    setLoading(true);

    try {
      await login(username, password);

      if (next === "__authorize__") {
        const returnUrl = sessionStorage.getItem("dauth_authorize_return");
        if (returnUrl) {
          sessionStorage.removeItem("dauth_authorize_return");
          router.replace(returnUrl);
          return;
        }
      }

      router.replace(next || "/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error("아이디 또는 비밀번호가 올바르지 않아요.", { position: "top" });
      } else {
        toast.error("서버에 연결할 수 없습니다.", { position: "top" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Card>
        <ImageSection>
          <img src={AUTH_IMAGE} alt="" />
          <ImageOverlay />
          <ImageText>
            <BrandTitle>DAuth</BrandTitle>
            <SubTitle>간편 로그인</SubTitle>
          </ImageText>
        </ImageSection>

        <FormSection>
          <Heading>
            <BrandSpan>도담도담</BrandSpan> 계정으로
            <br />
            로그인하기
          </Heading>

          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <TextField
                type="text"
                label="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                type="password"
                label="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <HintText>
                비밀번호를 잊으셨나요?{" "}
                <HintLink>비밀번호 재설정</HintLink>
              </HintText>

              <FilledButton
                role="primary"
                size="large"
                display="fill"
                onClick={() => {}}
                type="submit"
                disabled={loading}
                buttonCustomStyle={{}}
              >
                {loading ? "로그인 중..." : "로그인"}
              </FilledButton>
            </FieldGroup>
          </form>
        </FormSection>
      </Card>

      <BottomText>
        계정이 없으시다면? <BottomLink>회원가입</BottomLink>
      </BottomText>
    </PageWrapper>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <PageWrapper>
          <LoadingText>로딩 중...</LoadingText>
        </PageWrapper>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${colors.background.default};
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  border-radius: 12px;
  padding: 12px;
  background: ${colors.background.surface};
`;

const ImageSection = styled.div`
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

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
`;

const ImageText = styled.div`
  position: absolute;
  left: 40px;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BrandTitle = styled.span`
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1.92px;
  color: ${colors.brand.primary};
`;

const SubTitle = styled.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.48px;
  color: ${colors.static.white};
`;

const FormSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 24px 32px;
`;

const Heading = styled.h1`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.84px;
  color: ${colors.text.primary};
`;

const BrandSpan = styled.span`
  color: ${colors.brand.primary};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;


const HintText = styled.p`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.28px;
  color: ${colors.text.tertiary};
`;

const HintLink = styled.span`
  color: ${colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
`;

const BottomText = styled.p`
  position: fixed;
  bottom: 84px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.28px;
  color: ${colors.text.placeholder};
`;

const BottomLink = styled.span`
  color: ${colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
`;

const LoadingText = styled.p`
  color: ${colors.text.placeholder};
`;
