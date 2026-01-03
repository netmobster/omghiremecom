import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Linkedin, Scan, ArrowRight, PartyPopper } from "lucide-react";

interface LinkedInScannerProps {
  onNext: () => void;
}

const LinkedInScanner = ({ onNext }: LinkedInScannerProps) => {
  const [stage, setStage] = useState<"input" | "scanning" | "scanned" | "joke">("input");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleScan = () => {
    if (linkedinUrl.trim()) {
      setStage("scanning");
    }
  };

  useEffect(() => {
    if (stage === "scanning") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("scanned");
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  if (stage === "joke") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
        <div className="max-w-md md:max-w-xl w-full text-center space-y-6 animate-bounce-in">
          <div className="text-6xl">
            <PartyPopper className="w-16 h-16 mx-auto text-accent" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground">
            KIDDING!
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            That's silly — I already have your info. You're on{" "}
            <span className="text-foreground font-semibold">my</span> website,
            remember?
          </p>
          <p className="text-muted-foreground">
            Let's hop onto the good stuff. 🎉
          </p>
          <Button
            onClick={onNext}
            size="lg"
            className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-all group text-lg py-6 rounded-xl font-semibold"
          >
            Show Me Everything
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "scanned") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
        <div className="max-w-md md:max-w-xl w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <Scan className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Scan Complete!
          </h2>
          <p className="text-lg text-muted-foreground">
            I've got all your info now. Please enter your details on the next screen.
          </p>
          <Button
            onClick={() => setStage("joke")}
            size="lg"
            className="w-full gradient-secondary text-secondary-foreground hover:opacity-90 transition-all group text-lg py-6 rounded-xl font-semibold"
          >
            Continue to Form
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "scanning") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
        <div className="max-w-md md:max-w-xl w-full text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full gradient-secondary flex items-center justify-center mx-auto">
              <Linkedin className="w-12 h-12 text-secondary-foreground animate-pulse" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-secondary/30 animate-spin-slow" 
                 style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }} />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Scanning Your Profile...
          </h2>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {progress < 15 && "Accessing LinkedIn API..."}
              {progress >= 15 && progress < 30 && "Calculating your buzzword density..."}
              {progress >= 30 && progress < 45 && "Checking if you've said 'synergy' unironically..."}
              {progress >= 45 && progress < 60 && "Analyzing endorsements for 'Microsoft Word'..."}
              {progress >= 60 && progress < 75 && "Measuring thought leadership levels..."}
              {progress >= 75 && progress < 90 && "Consulting the hiring gods..."}
              {progress >= 90 && "Almost done... probably..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
      <div className="max-w-md md:max-w-xl w-full text-center space-y-8 animate-fade-in">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full gradient-secondary flex items-center justify-center mx-auto">
          <Linkedin className="w-10 h-10 text-secondary-foreground" />
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Let Me Learn About You
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your company's LinkedIn URL and I'll auto-populate your information.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <Input
            type="url"
            placeholder="https://linkedin.com/company/..."
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="text-center h-14 text-lg rounded-xl"
          />
          <Button
            onClick={handleScan}
            disabled={!linkedinUrl.trim()}
            size="lg"
            className="w-full gradient-secondary text-secondary-foreground hover:opacity-90 transition-all text-lg py-6 rounded-xl font-semibold disabled:opacity-50"
          >
            <Scan className="mr-2 w-5 h-5" />
            Scan Profile
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Saves you the trouble of filling out a form. You're welcome.
        </p>
      </div>
    </div>
  );
};

export default LinkedInScanner;
