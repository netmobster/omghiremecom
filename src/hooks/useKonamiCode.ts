import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp", 
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export const useKonamiCode = (callback: () => void) => {
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setKeySequence((prev) => {
      const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length);
      
      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        callback();
        return [];
      }
      
      return newSequence;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return keySequence.length;
};
