import { useEffect } from "react";
import { useClickSound } from "./useClickSound";

export function useGlobalClickSound() {
  const playClick = useClickSound();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.dataset.clickable === "true"
      ) {
        playClick();
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [playClick]);
}
