import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 rounded-full gap-2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-xs hidden sm:inline">Professional Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-xs hidden sm:inline">Mysterious Mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
