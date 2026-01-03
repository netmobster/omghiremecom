import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

const EasterEggCompletionHandler = () => {
  const { justCompletedAll, clearJustCompleted } = useEasterEggs();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (justCompletedAll && location.pathname !== "/secrets") {
      // Epic confetti explosion
      const duration = 2000;
      const end = Date.now() + duration;
      
      const frame = () => {
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffd700', '#ffed4a', '#f6e05e', '#ecc94b'],
        });
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffd700', '#ffed4a', '#f6e05e', '#ecc94b'],
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();

      toast({
        title: "🏆 ALL EASTER EGGS FOUND!",
        description: "You absolute legend! Redirecting to claim your prize...",
      });

      // Navigate after a short delay for dramatic effect
      setTimeout(() => {
        clearJustCompleted();
        navigate("/secrets");
      }, 1500);
    }
  }, [justCompletedAll, navigate, location.pathname, clearJustCompleted, toast]);

  return null;
};

export default EasterEggCompletionHandler;
