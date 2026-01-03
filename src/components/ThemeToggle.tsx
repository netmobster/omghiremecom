import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const TOGGLE_COUNT_KEY = "theme_toggle_count";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [toggleCount, setToggleCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem(TOGGLE_COUNT_KEY) || "0", 10);
    } catch {
      return 0;
    }
  });
  const { discoverEgg, hasFound } = useEasterEggs();
  const { toast } = useToast();

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

    // Track toggle count for easter egg
    const newCount = toggleCount + 1;
    setToggleCount(newCount);
    localStorage.setItem(TOGGLE_COUNT_KEY, newCount.toString());

    if (newCount === 5 && !hasFound("night_owl")) {
      discoverEgg("night_owl");
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.3 },
        colors: ['#1a1a2e', '#f5f5f5', '#6366f1'],
      });
      toast({
        title: "🦉 Night Owl Achievement!",
        description: "Can't decide? Neither can I. Welcome to the club.",
      });
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