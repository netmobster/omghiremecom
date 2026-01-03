import { useEasterEggs, EASTER_EGGS } from "@/contexts/EasterEggContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Egg, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

const Secrets = () => {
  const { hasFound, totalFound, totalEggs } = useEasterEggs();
  const [celebratedCompletion, setCelebratedCompletion] = useState(false);
  const allFound = totalFound === totalEggs;

  useEffect(() => {
    if (allFound && !celebratedCompletion) {
      setCelebratedCompletion(true);
      // Grand celebration for finding all eggs!
      const duration = 3000;
      const end = Date.now() + duration;
      
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
    }
  }, [allFound, celebratedCompletion]);

  return (
    <div className="min-h-screen gradient-bg">
      <ThemeToggle />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Journey
            </Button>
          </Link>
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Egg className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Secret Achievements
            </h1>
            <p className="text-muted-foreground">
              You've discovered {totalFound} of {totalEggs} hidden easter eggs
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(totalFound / totalEggs) * 100}%` }}
            />
          </div>
        </div>

        {/* Completion banner */}
        {allFound && (
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="p-6 text-center space-y-2">
              <Trophy className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-xl font-display font-bold text-foreground">
                🎉 Achievement Unlocked: Easter Egg Hunter! 🎉
              </h2>
              <p className="text-muted-foreground">
                You found ALL the secrets! You're officially a person of curiosity and dedication. 
                That's exactly the kind of person I'd want on my team (hint hint).
              </p>
            </CardContent>
          </Card>
        )}

        {/* Easter eggs grid */}
        <div className="grid gap-4">
          {EASTER_EGGS.map((egg) => {
            const found = hasFound(egg.id);
            
            return (
              <Card 
                key={egg.id}
                className={cn(
                  "transition-all duration-300",
                  found 
                    ? "border-primary/30 bg-card" 
                    : "border-muted bg-muted/30 opacity-60"
                )}
              >
                <CardContent className="p-4 sm:p-5 flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
                    found ? "bg-primary/10" : "bg-muted"
                  )}>
                    {found ? egg.icon : <Lock className="w-5 h-5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className={cn(
                      "font-display font-bold",
                      found ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {found ? egg.name : "???"}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      found ? "text-muted-foreground" : "text-muted-foreground/50 italic"
                    )}>
                      {found ? egg.description : egg.hint}
                    </p>
                  </div>
                  {found && (
                    <div className="shrink-0">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Found!
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer hint */}
        <p className="text-center text-sm text-muted-foreground italic">
          Hint: Some secrets are hidden in plain sight. Others require a bit more... persistence.
        </p>
      </div>
    </div>
  );
};

export default Secrets;
