import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Zap, Database, Mail, Palette, Egg, MessageSquare, Gamepad2, FileText, ScanLine, Heart, Share2, Moon, Printer, ExternalLink, Code2, Rocket } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
const features = [{
  icon: Sparkles,
  title: "AI-Powered Development",
  description: "Built entirely with Lovable's AI assistant through natural conversation - no traditional coding required."
}, {
  icon: Gamepad2,
  title: "Interactive Journey",
  description: "A multi-stage experience including a Tinder-style swipe game where you can only swipe right on my traits."
}, {
  icon: ScanLine,
  title: "Fake LinkedIn Scanner",
  description: "A satirical 'company scanner' animation that pretends to analyze your LinkedIn profile."
}, {
  icon: FileText,
  title: "Portfolio Tease",
  description: "A joke requirement to upload a 5-minute video before revealing it's all satire."
}, {
  icon: Egg,
  title: "Easter Egg System",
  description: "6 hidden achievements including Konami code, secret typing, click patterns, and more - with persistent tracking."
}, {
  icon: MessageSquare,
  title: "Satirical FAQ Section",
  description: "Common interview questions answered with personality and humor."
}, {
  icon: Heart,
  title: "Work Love Language Integration",
  description: "Links to my custom Work Love Language quiz app, also built with Lovable."
}, {
  icon: Mail,
  title: "Contact Form with Edge Functions",
  description: "Real email sending via Supabase Edge Functions and Resend API."
}, {
  icon: Database,
  title: "Backend Infrastructure",
  description: "Powered by Lovable Cloud with Supabase for serverless functions and potential data storage."
}, {
  icon: Palette,
  title: "Custom Design System",
  description: "Carefully crafted color palette, typography, and component variants using Tailwind CSS."
}, {
  icon: Moon,
  title: "Dark/Light Mode",
  description: "Professional Mode toggle with theme persistence across sessions."
}, {
  icon: Share2,
  title: "Social Sharing",
  description: "One-click sharing to Twitter, LinkedIn, Facebook, Slack, Teams, and more."
}, {
  icon: Printer,
  title: "Print-Friendly Styling",
  description: "Custom print CSS that creates a clean, professional resume-style output."
}, {
  icon: Zap,
  title: "Confetti Celebrations",
  description: "Strategic confetti explosions for achievements, form submissions, and easter eggs."
}];
const HowBuilt = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  useEffect(() => {
    // Staggered reveal animation
    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFeatures(prev => [...prev, index]);
      }, 100 + index * 80);
    });
  }, []);
  return <div className="min-h-screen gradient-bg">
      <ThemeToggle />
      <div className="max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Journey
            </Button>
          </Link>
          
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              How This Was Built
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">This entire site was built using Lovable and other tools — to create an interactive web app in the "show, don't tell" vein, while leaning on satire to highlight the absurdity of today's job search process. Can you hire me? Yes. Should you? Well, that's up to you!<span className="text-primary font-semibold">Lovable and other tools</span> — 
              an AI-powered development platform that turns conversations into production-ready web applications.
            </p>
          </div>
        </div>


        {/* Features Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground text-center animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            Features & Tech Stack
          </h2>
          <div className="grid gap-3">
            {features.map((feature, index) => <Card key={index} className={cn("transition-all duration-500 hover:border-primary/30", visibleFeatures.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={cn("w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300", visibleFeatures.includes(index) && "scale-100", !visibleFeatures.includes(index) && "scale-75")}>
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center space-y-2 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ and a healthy dose of self awareness
          </p>
          <p className="text-xs text-muted-foreground/60">
            Total development time: Way less than you would think
          </p>
        </div>
        <Footer />
      </div>
    </div>;
};
export default HowBuilt;