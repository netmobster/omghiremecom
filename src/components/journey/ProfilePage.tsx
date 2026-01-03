import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Linkedin,
  FileText,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const avatarStages = [
  { label: "Professional Jay", description: "The LinkedIn version", type: "illustrated" },
  { label: "Real Jay", description: "The headshot", type: "linkedin" },
  { label: "Realer Jay", description: "McDonald's vibes", type: "mcdonalds" },
  { label: "Realest Jay", description: "Full send", type: "jumping" },
];

const uniqueThings = [
  { text: "Built a Work Love Language quiz (it's a thing!)", type: "professional", rotation: -3 },
  { text: "Speaks fluent meme", type: "personal", rotation: 2 },
  { text: "Turns complex ideas into simple stories", type: "professional", rotation: -1 },
  { text: "Coffee-powered decision maker", type: "personal", rotation: 4 },
  { text: "Data nerd with design sensibility", type: "professional", rotation: -2 },
  { text: "Probably overthinking this right now", type: "personal", rotation: 1 },
  { text: "Makes docs actually fun to read", type: "professional", rotation: -4 },
  { text: "Unironically loves spreadsheets", type: "personal", rotation: 3 },
];

const testimonials = [
  {
    quote: "Jay brought creativity and strategy together in ways I didn't know were possible.",
    author: "Happy Client",
    role: "CEO, Tech Startup",
  },
  {
    quote: "The rare marketer who can actually code AND communicate. Unicorn status.",
    author: "Former Colleague",
    role: "Product Manager",
  },
  {
    quote: "Jay's work speaks for itself. Which is good because they won't stop talking otherwise.",
    author: "Definitely Real Person",
    role: "Testimonial Writer",
  },
];

const ProfilePage = () => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAvatarClick = () => {
    setAvatarIndex((prev) => (prev + 1) % avatarStages.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Placeholder - will integrate with Cloud later
    setTimeout(() => {
      toast({
        title: "Message received! 🎉",
        description: "I'll get back to you faster than you can say 'full-stack marketer'.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-2xl mx-auto p-6 space-y-12 py-12">
        {/* Avatar Section */}
        <section className="text-center space-y-4 animate-fade-in">
          <div
            onClick={handleAvatarClick}
            className="relative w-40 h-40 mx-auto rounded-full gradient-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group shadow-xl"
          >
            <User className="w-20 h-20 text-primary-foreground" />
            <div className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
              <span className="text-xs text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                Click me!
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-foreground">Jay</h1>
            <p className="text-muted-foreground">{avatarStages[avatarIndex].description}</p>
            <p className="text-xs text-muted-foreground">
              Stage {avatarIndex + 1}/{avatarStages.length}: {avatarStages[avatarIndex].label}
            </p>
          </div>
        </section>

        {/* Work Love Language */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl gradient-fun flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-foreground">Work Love Language</h3>
                  <p className="text-sm text-muted-foreground">Discover how I collaborate best</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => window.open("https://worklovelanguage.lovable.app", "_blank")}
                >
                  Take the Quiz
                  <ExternalLink className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Unique Jay Things */}
        <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-display font-bold text-foreground text-center">
            Unique Jay Things
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {uniqueThings.map((thing, i) => (
              <div
                key={i}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all hover:scale-105 cursor-default",
                  thing.type === "professional"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
                style={{ transform: `rotate(${thing.rotation}deg)` }}
              >
                {thing.text}
              </div>
            ))}
          </div>
        </section>

        {/* Resume & Portfolio */}
        <section className="grid gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-display font-bold text-foreground text-center">
            The Goods
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => window.open("/Jeremy_Wright_Resume.pdf", "_blank")}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Resume</h3>
                  <p className="text-sm text-muted-foreground">PDF • Click to view</p>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => window.open("/Jeremy_Wright_Portfolio.pdf", "_blank")}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Portfolio</h3>
                  <p className="text-sm text-muted-foreground">PDF • Click to view</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open("https://linkedin.com/in/jeremywright", "_blank")}
          >
            <Linkedin className="mr-2 w-4 h-4" />
            View LinkedIn Profile
            <ExternalLink className="ml-2 w-3 h-3" />
          </Button>
        </section>

        {/* Testimonials */}
        <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl font-display font-bold text-foreground text-center">
            What People Say
          </h2>
          <Card className="relative overflow-hidden">
            <CardContent className="p-6 text-center space-y-4">
              <p className="text-lg italic text-foreground">
                "{testimonials[testimonialIndex].quote}"
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[testimonialIndex].author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[testimonialIndex].role}
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTestimonialIndex(
                      (prev) => (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === testimonialIndex ? "bg-primary w-4" : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Hire Me If / Don't Hire Me If */}
        <section className="grid sm:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Card className="border-success/30">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-display font-bold text-lg text-success flex items-center gap-2">
                ✓ Hire Me If
              </h3>
              <p className="text-muted-foreground text-sm italic">
                Content coming soon...
              </p>
            </CardContent>
          </Card>
          <Card className="border-destructive/30">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-display font-bold text-lg text-destructive flex items-center gap-2">
                ✗ Don't Hire Me If
              </h3>
              <p className="text-muted-foreground text-sm italic">
                Content coming soon...
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-2xl font-display font-bold text-foreground text-center">
            Let's Chat
          </h2>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <Textarea
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-all py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pb-8">
          <p>Made with ❤️ and a healthy dose of self-awareness</p>
        </footer>
      </div>
    </div>
  );
};

export default ProfilePage;
