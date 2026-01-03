import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeGameProps {
  onNext: () => void;
}

const traits = [
  {
    title: "Data-Driven Strategist",
    description: "I don't guess, I measure. Every campaign backed by analytics.",
    emoji: "📊",
  },
  {
    title: "Full-Stack Marketer",
    description: "From brand strategy to code deployment. Yes, really.",
    emoji: "🚀",
  },
  {
    title: "Creative Problem Solver",
    description: "Constraints fuel creativity. Give me a puzzle.",
    emoji: "🧩",
  },
  {
    title: "Tech-Savvy Communicator",
    description: "I speak fluent Developer AND fluent Human.",
    emoji: "💬",
  },
  {
    title: "Growth Obsessed",
    description: "Always optimizing, always testing, never settling.",
    emoji: "📈",
  },
  {
    title: "Delightfully Weird",
    description: "Normal is boring. I bring personality to everything.",
    emoji: "✨",
  },
];

const funnyErrors = [
  "Nice try, but that's non-negotiable! 😤",
  "Error 404: Bad taste detected 🚫",
  "Hmm, are you SURE about that? 🤔",
  "That's... not how this works 😅",
  "Bold choice. Wrong, but bold. ❌",
  "I'm going to pretend I didn't see that 🙈",
  "HR would like a word with you... 📋",
  "That's going in your permanent record! 📝",
  "My therapist warned me about people like you 🛋️",
  "Did you mean to swipe right? Please say yes 🥺",
  "I'm not mad, just disappointed 😔",
  "This will be remembered during negotiations 💼",
];

const SwipeGame = ({ onNext }: SwipeGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<"right" | "left" | null>(null);
  const [completedTraits, setCompletedTraits] = useState<number[]>([]);

  const currentTrait = traits[currentIndex];
  const isComplete = completedTraits.length === traits.length;

  const handleSwipeRight = () => {
    if (isAnimating) return;
    
    setError(null);
    setIsAnimating(true);
    setAnimationType("right");

    setTimeout(() => {
      setCompletedTraits((prev) => [...prev, currentIndex]);
      setCurrentIndex((prev) => (prev + 1) % traits.length);
      setIsAnimating(false);
      setAnimationType(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    if (isAnimating) return;
    
    setAnimationType("left");
    setIsAnimating(true);
    const randomError = funnyErrors[Math.floor(Math.random() * funnyErrors.length)];
    setError(randomError);

    setTimeout(() => {
      setIsAnimating(false);
      setAnimationType(null);
    }, 400);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
        <div className="max-w-md w-full text-center space-y-6 animate-bounce-in">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-display font-bold text-foreground">
            Look at That!
          </h2>
          <p className="text-lg text-muted-foreground">
            You accepted all my traits. We might just be a match made in
            marketing heaven.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {traits.map((trait, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-success/10 text-success rounded-full"
              >
                {trait.emoji} {trait.title}
              </span>
            ))}
          </div>
          <Button
            onClick={onNext}
            size="lg"
            className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-all group text-lg py-6 rounded-xl font-semibold"
          >
            I'm Intrigued, Continue
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-bg">
      <div className="max-w-md w-full space-y-6">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {traits.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                completedTraits.includes(i)
                  ? "bg-success"
                  : i === currentIndex
                  ? "bg-primary w-4"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-bold text-foreground">
            The Compatibility Test
          </h2>
          <p className="text-muted-foreground text-sm">
            Select your preference for each trait 👇
          </p>
        </div>

        {/* Card */}
        <div
          className={cn(
            "relative bg-card rounded-3xl p-8 shadow-xl border border-border/50 min-h-[320px] flex flex-col items-center justify-center text-center",
            animationType === "right" && "animate-swipe-right",
            animationType === "left" && "animate-swipe-left animate-shake"
          )}
        >
          <span className="text-6xl mb-4">{currentTrait.emoji}</span>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">
            {currentTrait.title}
          </h3>
          <p className="text-muted-foreground">{currentTrait.description}</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-center animate-bounce-in font-medium">
            {error}
          </div>
        )}

        {/* Swipe buttons */}
        <div className="flex justify-center gap-6">
          <Button
            onClick={handleSwipeLeft}
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full border-2 border-destructive/30 hover:bg-destructive/10 hover:border-destructive transition-all"
            disabled={isAnimating}
          >
            <X className="w-8 h-8 text-destructive" />
          </Button>
          <Button
            onClick={handleSwipeRight}
            size="icon"
            className="w-16 h-16 rounded-full gradient-primary hover:opacity-90 transition-all shadow-lg"
            disabled={isAnimating}
          >
            <Heart className="w-8 h-8 text-primary-foreground" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Pro tip: The X button tooootally works! 😉
        </p>
      </div>
    </div>
  );
};

export default SwipeGame;
