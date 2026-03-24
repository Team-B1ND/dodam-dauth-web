"use client";

import { useState, FormEvent, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@b1nd/dodam-design-system";
import { login } from "@/features/auth/api";
import axios from "axios";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent) => {
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
  }, [username, password, next, router, toast]);

  return { username, setUsername, password, setPassword, loading, handleSubmit };
}
