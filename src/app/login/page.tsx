"use client";

import { Suspense } from "react";
import { TextField, FilledButton } from "@b1nd/dodam-design-system";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import * as S from "./login.styles";

const AUTH_IMAGE = "/auth-bg.jpg";

function LoginContent() {
  const { username, setUsername, password, setPassword, loading, handleSubmit } = useLoginForm();

  return (
    <S.PageWrapper>
      <S.Card>
        <S.ImageSection>
          <img src={AUTH_IMAGE} alt="" />
          <S.ImageOverlay />
          <S.ImageText>
            <S.BrandTitle>DAuth</S.BrandTitle>
            <S.SubTitle>간편 로그인</S.SubTitle>
          </S.ImageText>
        </S.ImageSection>

        <S.FormSection>
          <S.Heading>
            <S.BrandSpan>도담도담</S.BrandSpan> 계정으로
            <br />
            로그인하기
          </S.Heading>

          <form onSubmit={handleSubmit} noValidate>
            <S.FieldGroup>
              <TextField type="text" label="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
              <TextField type="password" label="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
              <S.HintText>
                비밀번호를 잊으셨나요? <S.HintLink>비밀번호 재설정</S.HintLink>
              </S.HintText>
              <FilledButton role="primary" size="large" display="fill" type="submit" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </FilledButton>
            </S.FieldGroup>
          </form>
        </S.FormSection>
      </S.Card>

      <S.BottomText>
        계정이 없으시다면? <S.BottomLink>회원가입</S.BottomLink>
      </S.BottomText>
    </S.PageWrapper>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<S.PageWrapper><S.LoadingText>로딩 중...</S.LoadingText></S.PageWrapper>}>
      <LoginContent />
    </Suspense>
  );
}