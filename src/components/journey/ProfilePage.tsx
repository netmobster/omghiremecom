import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  X,
  Share2,
  Twitter,
  Facebook,
  Link,
  Shield,
  Telescope,
  TrendingUp,
  Music,
  Banana,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import wllArchitect from "@/assets/WLL_architect.png";
import avatarEmoji from "@/assets/avatar-emoji.png";
import avatarLinkedin from "@/assets/avatar-linkedin.jpg";
import avatarMcdonalds from "@/assets/avatar-mcdonalds.jpg";
import avatarJumping from "@/assets/avatar-jumping.jpg";

const avatarStages = [
  { 
    label: "Professional Jeremy", 
    description: "The LinkedIn version", 
    image: avatarEmoji,
    caption: "Oh, you want to see the real me? Click on through for professional, personal, and \"okay, yeah, he's a little odd\" (as if you're surprised at this point!)"
  },
  { 
    label: "Real Jeremy", 
    description: "The headshot", 
    image: avatarLinkedin,
    caption: "Gawd I hate headshots..."
  },
  { 
    label: "Realer Jeremy", 
    description: "McDonald's vibes", 
    image: avatarMcdonalds,
    caption: "Actual moi, though I do like to rawk hoodies with blazers"
  },
  { 
    label: "Realest Jeremy", 
    description: "Full send", 
    image: avatarJumping,
    caption: "Yeah, see, odd. Friend (to the right), his wedding photog said to \"manly jump\" and this was all of our reaction, without coordinating..."
  },
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
    quote: "Jeremy brought creativity and strategy together in ways I didn't know were possible.",
    author: "Happy Client",
    role: "CEO, Tech Startup",
  },
  {
    quote: "The rare marketer who can actually code AND communicate. Unicorn status.",
    author: "Former Colleague",
    role: "Product Manager",
  },
  {
    quote: "Jeremy's work speaks for itself. Which is good because he won't stop talking otherwise.",
    author: "Definitely Real Person",
    role: "Testimonial Writer",
  },
];

const ProfilePage = () => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/realness` 
    : '/realness';
  const shareText = "Check out Jeremy Wright's interactive portfolio - it's unlike any resume you've seen!";

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share it with your favorite hiring manager 😉",
        });
        return;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const handleAvatarClick = () => {
    setGalleryIndex(0);
    setIsGalleryOpen(true);
  };

  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev - 1 + avatarStages.length) % avatarStages.length);
  };

  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev + 1) % avatarStages.length);
  };

  const handleSubmit = async (subject: string) => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Hold up!",
        description: "I need at least your name and email to get back to you.",
        variant: "destructive",
      });
      return;
    }
    
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

  const handleAreYouSingle = () => {
    toast({
      title: "COME ON!",
      description: "Not that kind of hiring! 😅",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-2xl mx-auto p-6 space-y-12 py-12">
        {/* Avatar Section */}
        <section className="text-center space-y-4 animate-fade-in">
          <div
            onClick={handleAvatarClick}
            className="relative w-40 h-40 mx-auto rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform group shadow-xl"
          >
            {avatarStages[avatarIndex].image ? (
              <img 
                src={avatarStages[avatarIndex].image} 
                alt={avatarStages[avatarIndex].label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full gradient-primary flex items-center justify-center">
                <User className="w-20 h-20 text-primary-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
              <span className="text-xs text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium drop-shadow-lg">
                Click for more realness!
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-foreground">Jeremy Wright</h1>
            <p className="text-muted-foreground">{avatarStages[avatarIndex].description}</p>
            <p className="text-xs text-muted-foreground">
              Stage {avatarIndex + 1}/{avatarStages.length}: {avatarStages[avatarIndex].label}
            </p>
          </div>
        </section>

        {/* Avatar Gallery Modal */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-transparent shadow-none">
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              {/* Image */}
              <div className="relative aspect-square">
                <img 
                  src={avatarStages[galleryIndex].image} 
                  alt={avatarStages[galleryIndex].label}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                <button
                  onClick={handleGalleryPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={handleGalleryNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Caption */}
              <div className="p-6 space-y-2 text-center">
                <div className="flex justify-center gap-2 mb-3">
                  {avatarStages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === galleryIndex 
                          ? "bg-primary w-4" 
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                    />
                  ))}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  {avatarStages[galleryIndex].label}
                </h3>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  {avatarStages[galleryIndex].caption}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Work Love Language */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6 space-y-4">
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
              <img 
                src={wllArchitect} 
                alt="Work Love Language - The Architect: High-trust, self-directed execution" 
                className="w-full rounded-lg shadow-md"
              />
            </CardContent>
          </Card>
        </section>

        {/* Unique Jeremy Things */}
        <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-display font-bold text-foreground text-center">
            Unique Jeremy Things
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

        {/* Share This */}
        <section className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Know someone who should hire me?</h3>
              </div>
              <p className="text-sm text-muted-foreground">Sharing is caring (and gets me employed)</p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  onClick={() => handleShare('copy')}
                >
                  <Link className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <Card className="border-success/30 bg-success/5">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-success flex items-center gap-2">
                ✓ Hire Me If
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You want an army dude with a big heart</span>
                </li>
                <li className="flex items-start gap-3">
                  <Telescope className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You need someone who sees the future (I blogged about marketing before it was cool)</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You want someone who grows shiz</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-destructive flex items-center gap-2">
                ✗ Don't Hire Me If
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Music className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">You don't like joy (I'm a musician, deal with it)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Banana className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">Memes aren't real life (I'm the "banana for scale" guy on Imgur)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">Geeks aren't sexy (sci-fi comedy writer — my mom says I'm funny!)</span>
                </li>
              </ul>
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
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>
                <Textarea
                  placeholder="What's on your mind? (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
                
                {/* Fun submit buttons */}
                <div className="space-y-3 pt-2">
                  <p className="text-center text-sm text-muted-foreground italic">
                    Select one — note there are only 4 wright answers
                  </p>
                  <div className="grid gap-2">
                    <Button
                      type="button"
                      onClick={() => handleSubmit("WTF - Confused but intrigued")}
                      disabled={isSubmitting}
                      variant="outline"
                      className="w-full py-4 text-sm hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      WTF, I want to talk but IDK why
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleSubmit("Sigh, okay fine")}
                      disabled={isSubmitting}
                      variant="outline"
                      className="w-full py-4 text-sm hover:bg-secondary hover:text-secondary-foreground transition-all"
                    >
                      Sigh... okay, fine
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAreYouSingle}
                      variant="outline"
                      className="w-full py-4 text-sm hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      Are you single?
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleSubmit("Let's talk for realz")}
                      disabled={isSubmitting}
                      className="w-full gradient-primary text-primary-foreground hover:opacity-90 py-4 text-sm font-semibold"
                    >
                      <Send className="mr-2 w-4 h-4" />
                      Let's talk for realz, Jay
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    (That's what people call me in places that can't pronounce R's, okay?)
                  </p>
                </div>
              </div>
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
