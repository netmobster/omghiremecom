import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Info } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

interface IntroPageProps {
  onNext: () => void;
}

const IntroPage = ({ onNext }: IntroPageProps) => {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [sparkleClicks, setSparkleClicks] = useState(0);
  const { toast } = useToast();

  // Easter egg: click sparkles 7 times
  const handleSparkleClick = () => {
    const newCount = sparkleClicks + 1;
    setSparkleClicks(newCount);
    
    if (newCount === 7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 },
        shapes: ['star'],
        colors: ['#ffd700', '#ffed4a', '#f6e05e'],
      });
      toast({
        title: "✨ Sparkle Master Unlocked!",
        description: "You clicked all the sparkles! You must really like shiny things.",
      });
      setSparkleClicks(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Playful sparkle decoration - clickable easter egg */}
        <div className="flex justify-center gap-2 text-primary cursor-pointer" onClick={handleSparkleClick}>
          <Sparkles className="w-6 h-6 animate-pulse hover:scale-125 transition-transform" />
          <Sparkles className="w-8 h-8 animate-pulse delay-100 hover:scale-125 transition-transform" />
          <Sparkles className="w-6 h-6 animate-pulse delay-200 hover:scale-125 transition-transform" />
        </div>

        {/* Main headline with typewriter effect */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-primary leading-tight min-h-[2.5em]">
          <TypewriterText 
            text="Oh, You Want to Hire Me?" 
            delay={60}
            onComplete={() => setTypewriterDone(true)}
          />
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          Bold move. I like it. But first, let's see if{" "}
          <span className="text-foreground font-semibold">you're</span> the right fit.
        </p>

        {/* Satire tip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-xs text-muted-foreground">
          <Info className="w-3 h-3 text-accent" />
          <span>Psst... this is satire. I promise I'm actually quite pleasant to work with.</span>
        </div>

        {/* What's coming teaser */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 space-y-3">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            What awaits you:
          </p>
          <ul className="text-left space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              A totally fair compatibility test
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Reasonable requests for your time
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Everything you need to make your decision
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onNext}
          size="lg"
          className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-all group text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl"
        >
          Let's Do This
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-xs text-muted-foreground">
          No actual hiring managers were harmed in the making of this experience.
        </p>
        <button 
          onClick={() => alert("By continuing, you agree to eventually hire me. This is legally binding. I checked. (I didn't check.)")}
          className="text-xs text-muted-foreground/50 hover:text-muted-foreground underline transition-colors"
        >
          Terms & Extremely Reasonable Conditions
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
