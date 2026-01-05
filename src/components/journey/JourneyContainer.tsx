import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import IntroPage from "./IntroPage";
import SwipeGame from "./SwipeGame";
import PortfolioTease from "./PortfolioTease";
import LinkedInScanner from "./LinkedInScanner";
import ThemeToggle from "@/components/ThemeToggle";
import confetti from "canvas-confetti";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useSecretWord } from "@/hooks/useSecretWord";
import { useAchievementToast } from "@/hooks/useAchievementToast";
import { useEasterEggs } from "@/contexts/EasterEggContext";

type Stage = "intro" | "swipe" | "portfolio" | "linkedin";


const JourneyContainer = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("intro");
  const [konamiTriggered, setKonamiTriggered] = useState(false);
  const navigate = useNavigate();
  const { showAchievementToast } = useAchievementToast();
  const { discoverEgg } = useEasterEggs();

  // Konami code easter egg
  const handleKonamiCode = useCallback(() => {
    if (konamiTriggered) return;
    setKonamiTriggered(true);
    discoverEgg("konami");
    
    // Epic confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
    
    showAchievementToast({
      title: "🎮 KONAMI CODE ACTIVATED!",
      description: "You're officially a person of culture. +30 hiring points.",
      achievementName: "Konami Code Master",
    });
    
    // Reset after a while so they can do it again
    setTimeout(() => setKonamiTriggered(false), 10000);
  }, [konamiTriggered, showAchievementToast, discoverEgg]);

  // Secret word easter egg - typing "hire" anywhere
  const handleHireTyped = useCallback(() => {
    discoverEgg("hire");
    showAchievementToast({
      title: "👀 Did you just type 'hire'?",
      description: "The subliminal messaging is working! Keep going...",
      achievementName: "Subliminal Hire",
    });
  }, [showAchievementToast, discoverEgg]);

  useKonamiCode(handleKonamiCode);
  useSecretWord("hire", handleHireTyped);

  const goToStage = (stage: Stage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToProfile = () => {
    // Journey completion confetti!
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      navigate("/realness");
    }, 500);
  };

  const renderStage = () => {
    switch (currentStage) {
      case "intro":
        return <IntroPage onNext={() => goToStage("swipe")} />;
      case "swipe":
        return <SwipeGame onNext={() => goToStage("portfolio")} />;
      case "portfolio":
        return <PortfolioTease onNext={() => goToStage("linkedin")} />;
      case "linkedin":
        return <LinkedInScanner onNext={goToProfile} />;
      default:
        return <IntroPage onNext={() => goToStage("swipe")} />;
    }
  };

  return (
    <>
      <ThemeToggle />
      {renderStage()}
    </>
  );
};

export default JourneyContainer;
