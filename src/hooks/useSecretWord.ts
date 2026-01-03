import { useEffect, useState, useCallback } from "react";

export const useSecretWord = (secretWord: string, callback: () => void) => {
  const [typedChars, setTypedChars] = useState("");

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only track letter keys
    if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
      setTypedChars((prev) => {
        const newTyped = (prev + event.key.toLowerCase()).slice(-secretWord.length);
        
        if (newTyped === secretWord.toLowerCase()) {
          callback();
          return "";
        }
        
        return newTyped;
      });
    }
  }, [secretWord, callback]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return typedChars;
};
