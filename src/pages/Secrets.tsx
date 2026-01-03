import { useState } from "react";
import { useEasterEggs, EASTER_EGGS } from "@/contexts/EasterEggContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, Lock, Egg, Trophy, ChevronDown, Send, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Secrets = () => {
  const { hasFound, totalFound, totalEggs, resetAll } = useEasterEggs();
  const [celebratedCompletion, setCelebratedCompletion] = useState(false);
  const [prizeOpen, setPrizeOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
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

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Hold up!",
        description: "I need at least your name and email to get back to you.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Hmm, that email looks sus...",
        description: "Please enter a valid email address!",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message || "Found all the easter eggs! 🥚",
          subject: "🏆 Secret Keeper Achievement Unlocked!"
        }
      });
      if (error) throw error;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: "🎉 Message sent!",
        description: "You've earned the right to skip the queue. I'll be in touch!"
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Try again!",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 shadow-lg shadow-yellow-500/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    🏆 Secret Keeper Achievement!
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    You found ALL the secrets. You absolute legend.
                  </p>
                </div>
              </div>

              <Collapsible open={prizeOpen} onOpenChange={setPrizeOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 border-yellow-500/30 hover:bg-yellow-500/10"
                  >
                    <Gift className="w-4 h-4" />
                    Claim Your Prize
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      prizeOpen && "rotate-180"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="text-center space-y-2 py-2">
                    <p className="text-foreground font-medium">
                      Congratulations, you magnificent easter egg hunter! 🥚✨
                    </p>
                    <p className="text-muted-foreground text-sm">
                      As your reward for this incredible display of persistence, curiosity, 
                      and possibly procrastination, you've unlocked the <span className="text-yellow-500 font-semibold">VIP Contact Form™</span>. 
                      Messages sent from here get priority treatment (read: I'll actually read them 
                      instead of letting them collect dust in my inbox).
                    </p>
                    <p className="text-muted-foreground text-xs italic">
                      (Okay fine, I read all messages. But you get bragging rights.)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Your name (the one your mom uses when you're in trouble)"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      type="email"
                      placeholder="Your email (promise I won't spam)"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Textarea
                      placeholder="Tell me something cool, ask a question, or just say hi..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                    />
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-950"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send VIP Message"}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
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
                    ? "border-primary/50 bg-primary/5 shadow-md shadow-primary/10" 
                    : "border-border bg-card/50"
                )}
              >
                <CardContent className="p-4 sm:p-5 flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
                    found ? "bg-primary/20" : "bg-muted/50"
                  )}>
                    {found ? egg.icon : <Lock className="w-5 h-5 text-muted-foreground/60" />}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className={cn(
                      "font-display font-bold",
                      found ? "text-foreground" : "text-foreground/60"
                    )}>
                      {found ? egg.name : "???"}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      found ? "text-muted-foreground" : "text-foreground/40"
                    )}>
                      {found ? egg.description : egg.hint}
                    </p>
                  </div>
                  {found && (
                    <div className="shrink-0">
                      <span className="text-xs font-bold text-primary-foreground bg-primary px-3 py-1.5 rounded-full shadow-sm">
                        ✓ Found!
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
          {allFound 
            ? "You've found them all! You're officially a professional procrastinator. I respect that."
            : "Hint: Some secrets are hidden in plain sight. Others require a bit more... persistence."
          }
        </p>

        {/* Reset button */}
        {totalFound > 0 && (
          <div className="text-center pt-4 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetAll();
                setCelebratedCompletion(false);
                setPrizeOpen(false);
                toast({
                  title: "🔄 Achievements reset!",
                  description: "Time to hunt for eggs all over again. Good luck!",
                });
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              Reset all achievements
            </Button>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Secrets;
