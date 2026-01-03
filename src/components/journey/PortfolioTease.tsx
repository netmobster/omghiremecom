import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Video, ArrowRight, PartyPopper, Loader2 } from "lucide-react";

interface PortfolioTeaseProps {
  onNext: () => void;
}

const absurdLoadingMessages = [
  "Calculating how awkward this video would be...",
  "Estimating time to regret this decision...",
];

const PortfolioTease = ({ onNext }: PortfolioTeaseProps) => {
  const [stage, setStage] = useState<"initial" | "loading" | "joke">("initial");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const handleUploadClick = () => {
    setStage("loading");
  };

  useEffect(() => {
    if (stage === "loading") {
      // Cycle through loading messages
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex(prev => {
          if (prev >= absurdLoadingMessages.length - 1) {
            clearInterval(messageInterval);
            setStage("joke");
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
      
      return () => clearInterval(messageInterval);
    }
  }, [stage]);

  if (stage === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
          <h2 className="text-2xl font-display font-bold text-foreground">
            Uploading...
          </h2>
          <p className="text-muted-foreground min-h-[3em] transition-all">
            {absurdLoadingMessages[loadingMessageIndex]}
          </p>
        </div>
      </div>
    );
  }

  if (stage === "joke") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
        <div className="max-w-md w-full text-center space-y-6 animate-bounce-in">
          <div className="text-6xl">
            <PartyPopper className="w-16 h-16 mx-auto text-accent" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground">
            KIDDING!
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            That seems like{" "}
            <span className="text-foreground font-semibold">a lot of work</span>{" "}
            just to figure out if I'm even worth a 5-minute phone call.
          </p>
          <p className="text-muted-foreground">
            Let's flip the script — I'll show you{" "}
            <span className="text-primary font-medium">my</span> goods instead.
          </p>
          <Button
            onClick={onNext}
            size="lg"
            className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-all group text-lg py-6 rounded-xl font-semibold"
          >
            Fair Enough, Show Me
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full gradient-secondary flex items-center justify-center mx-auto">
            <Video className="w-12 h-12 text-secondary-foreground" />
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-foreground">
            One Small Request
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Before I show you my portfolio, please upload a{" "}
            <span className="text-foreground font-semibold">
              5-minute video introducing yourself
            </span>{" "}
            and explaining why I should let you hire me.
          </p>
        </div>

        {/* Upload area */}
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-primary/30 rounded-2xl p-8 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
        >
          <Upload className="w-12 h-12 mx-auto text-primary/50 group-hover:text-primary mb-4 transition-colors" />
          <p className="text-muted-foreground">
            Click to upload your video introduction
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            MP4, MOV up to 500MB
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          This is totally reasonable and not at all a double standard.
        </p>
      </div>
    </div>
  );
};

export default PortfolioTease;
