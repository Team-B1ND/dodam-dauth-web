"use client";

import type { ReactNode } from "react";
import { colors, mq, shapes } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";
import { useModalAnimation, MODAL_INITIAL, MODAL_EXIT, MODAL_TRANSITION } from "./useModalAnimation";

interface ModalShellProps extends OverlayControllerProps {
  children: ReactNode;
}

export function ModalShell({ isOpen, close, setDimClickHandler, children }: ModalShellProps) {
  const { controls } = useModalAnimation({ isOpen, setDimClickHandler });

  return (
    <AnimatePresence>
      {isOpen && (
        <Container initial={MODAL_INITIAL} animate={controls} exit={MODAL_EXIT} transition={MODAL_TRANSITION}>
          {children}
        </Container>
      )}
    </AnimatePresence>
  );
}

const Container = styled(motion.div)`
  width: 480px;
  background: ${colors.background.surface};
  border-radius: ${shapes.extraLarge};
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
  ${mq.mobileOnly} { width: calc(100% - 40px); }
`;
