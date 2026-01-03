import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroPage from "./IntroPage";
import SwipeGame from "./SwipeGame";
import PortfolioTease from "./PortfolioTease";
import LinkedInScanner from "./LinkedInScanner";
import JourneyProgress from "./JourneyProgress";
import ThemeToggle from "@/components/ThemeToggle";
import confetti from "canvas-confetti";

type Stage = "intro" | "swipe" | "portfolio" | "linkedin";

const stageToStep: Record<Stage, number> = {
  intro: 1,
  swipe: 2,
  portfolio: 3,
  linkedin: 4,
};

const JourneyContainer = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("intro");
  const navigate = useNavigate();

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

  const currentStep = stageToStep[currentStage];

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
      <JourneyProgress currentStep={currentStep} totalSteps={5} />
      {renderStage()}
    </>
  );
};

export default JourneyContainer;
