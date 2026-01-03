import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroPage from "./IntroPage";
import SwipeGame from "./SwipeGame";
import PortfolioTease from "./PortfolioTease";
import LinkedInScanner from "./LinkedInScanner";

type Stage = "intro" | "swipe" | "portfolio" | "linkedin";

const JourneyContainer = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("intro");
  const navigate = useNavigate();

  const goToStage = (stage: Stage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToProfile = () => {
    navigate("/realness");
  };

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

export default JourneyContainer;
