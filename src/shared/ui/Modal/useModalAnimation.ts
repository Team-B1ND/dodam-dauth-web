import { useCallback, useEffect } from "react";
import { useAnimationControls } from "framer-motion";
import type { OverlayControllerProps } from "@b1nd/dodam-design-system";

const WIGGLE = { x: [0, 4, -4, 3, -3, 0], transition: { duration: 0.25, ease: "easeInOut" as const } };

export function useModalAnimation({ isOpen, setDimClickHandler }: Pick<OverlayControllerProps, "isOpen" | "setDimClickHandler">) {
  const controls = useAnimationControls();
  const wiggle = useCallback(() => { controls.start(WIGGLE); }, [controls]);

  useEffect(() => {
    if (isOpen) {
      controls.start({ opacity: 1, scale: 1, x: 0 });
      setDimClickHandler(wiggle);
    }
  }, [isOpen, controls, setDimClickHandler, wiggle]);

  return { controls };
}

export const MODAL_INITIAL = { opacity: 0, scale: 0.9, x: 0 };
export const MODAL_EXIT = { opacity: 0, scale: 0.9 };
export const MODAL_TRANSITION = { type: "spring" as const, stiffness: 300, damping: 25 };
