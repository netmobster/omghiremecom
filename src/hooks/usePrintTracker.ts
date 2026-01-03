import { useEffect, useRef } from "react";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export const usePrintTracker = () => {
  const { discoverEgg, hasFound } = useEasterEggs();
  const { toast } = useToast();
  const hasTriggered = useRef(false);

  useEffect(() => {
    const handleBeforePrint = () => {
      if (!hasFound("print_enthusiast") && !hasTriggered.current) {
        hasTriggered.current = true;
        discoverEgg("print_enthusiast");
        
        // Small delay to let the print dialog show first
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 40,
            origin: { y: 0.3 },
            colors: ['#000', '#666', '#999'],
          });
          toast({
            title: "🖨️ Print Enthusiast Achievement!",
            description: "Wait, people still print things? Respect the classics!",
          });
        }, 100);
      }
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    
    // Also handle Ctrl+P / Cmd+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        handleBeforePrint();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [discoverEgg, hasFound, toast]);
};