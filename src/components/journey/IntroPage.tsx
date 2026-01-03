import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sparkles, ArrowRight, Info, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import Footer from "@/components/Footer";

interface IntroPageProps {
  onNext: () => void;
}

const IntroPage = ({ onNext }: IntroPageProps) => {
  const [sparkleClicks, setSparkleClicks] = useState(0);
  const [termsOpen, setTermsOpen] = useState(false);
  const { toast } = useToast();
  const { discoverEgg } = useEasterEggs();

  // Easter egg: click sparkles 7 times
  const handleSparkleClick = () => {
    const newCount = sparkleClicks + 1;
    setSparkleClicks(newCount);
    
    if (newCount === 7) {
      discoverEgg("sparkle");
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

        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-primary leading-tight">
          Oh, You Want to Hire Me?
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
          onClick={() => setTermsOpen(true)}
          className="text-xs text-muted-foreground/50 hover:text-muted-foreground underline transition-colors"
        >
          Terms & Extremely Reasonable Conditions
        </button>

        {/* Terms Modal */}
        <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center font-display">
                Terms & Extremely Reasonable Conditions
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">By proceeding, you acknowledge and agree to the following:</p>
              <ul className="space-y-2 list-disc pl-4">
                <li>You will eventually hire me. This is legally binding. I checked. <span className="italic">(I didn't check.)</span></li>
                <li>Any "we'll keep your resume on file" responses will be met with dramatic sighing.</li>
                <li>You forfeit the right to ghost after a final interview. Minimum one rejection email required.</li>
                <li>Coffee meetings are acceptable, but you're buying.</li>
                <li>Any mention of "competitive salary" must be followed by actual numbers within 30 seconds.</li>
                <li>"We're like a family here" triggers an automatic 15% salary increase request.</li>
                <li>You agree that my jokes are funny. <span className="italic">Laughing is optional but encouraged.</span></li>
              </ul>
              <p className="text-xs text-muted-foreground/70 italic pt-2">
                These terms were drafted by my legal team (me, at 2am, eating cereal).
              </p>
            </div>
            <DialogFooter className="sm:justify-center">
              <Button 
                onClick={() => {
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
                  });
                  setTermsOpen(false);
                }} 
                variant="outline"
              >
                I Accept My Fate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Footer />
      </div>
    </div>
  );
};

export default IntroPage;
