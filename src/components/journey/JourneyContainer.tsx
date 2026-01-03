import { useState } from "react";
import IntroPage from "./IntroPage";
import SwipeGame from "./SwipeGame";
import PortfolioTease from "./PortfolioTease";
import LinkedInScanner from "./LinkedInScanner";
import ProfilePage from "./ProfilePage";

type Stage = "intro" | "swipe" | "portfolio" | "linkedin" | "profile";

const JourneyContainer = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("intro");

  const goToStage = (stage: Stage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  switch (currentStage) {
    case "intro":
      return <IntroPage onNext={() => goToStage("swipe")} />;
    case "swipe":
      return <SwipeGame onNext={() => goToStage("portfolio")} />;
    case "portfolio":
      return <PortfolioTease onNext={() => goToStage("linkedin")} />;
    case "linkedin":
      return <LinkedInScanner onNext={() => goToStage("profile")} />;
    case "profile":
      return <ProfilePage />;
    default:
      return <IntroPage onNext={() => goToStage("swipe")} />;
  }
};

export default JourneyContainer;
