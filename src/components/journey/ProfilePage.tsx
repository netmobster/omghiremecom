import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Linkedin, FileText, Mail, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Heart, Send, User, X, Share2, Twitter, Facebook, Link, Shield, Telescope, TrendingUp, Music, Banana, Rocket, Copy, Check, Cog, Compass, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import ThemeToggle from "@/components/ThemeToggle";
import FAQSection from "./FAQSection";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import { usePdfTracker } from "@/hooks/usePdfTracker";
import Footer from "@/components/Footer";
import wllArchitect from "@/assets/WLL_architect.png";
import avatarEmoji from "@/assets/avatar-emoji.png";
import avatarLinkedin from "@/assets/avatar-linkedin.jpg";
import avatarMcdonalds from "@/assets/avatar-mcdonalds.jpg";
import avatarJumping from "@/assets/avatar-jumping.jpg";
const avatarStages = [{
  label: "Professional Jeremy",
  description: "The LinkedIn version",
  image: avatarEmoji,
  caption: "Oh, you want to see the real me? Click on through for professional, personal, and \"okay, yeah, he's a little odd\" (as if you're surprised at this point!)"
}, {
  label: "Real Jeremy",
  description: "The headshot",
  image: avatarLinkedin,
  caption: "Gawd I hate headshots..."
}, {
  label: "Realer Jeremy",
  description: "McDonald's vibes",
  image: avatarMcdonalds,
  caption: "Actual moi, though I do like to rawk hoodies with blazers"
}, {
  label: "Realest Jeremy",
  description: "Full send",
  image: avatarJumping,
  caption: "Yeah, see, odd. Friend (to the right), his wedding photog said to \"manly jump\" and this was all of our reaction, without coordinating..."
}];
const uniqueThings = [{
  text: "Built a Work Love Language quiz (it's a thing!)",
  type: "professional",
  rotation: -3
}, {
  text: "Speaks fluent meme",
  type: "personal",
  rotation: 2
}, {
  text: "Turns complex ideas into simple stories",
  type: "professional",
  rotation: -1
}, {
  text: "Coffee-powered decision maker",
  type: "personal",
  rotation: 4
}, {
  text: "Data nerd with design sensibility",
  type: "professional",
  rotation: -2
}, {
  text: "Probably overthinking this right now",
  type: "personal",
  rotation: 1
}, {
  text: "Makes docs actually fun to read",
  type: "professional",
  rotation: -4
}, {
  text: "Unironically loves spreadsheets",
  type: "personal",
  rotation: 3
}];
const testimonials = [{
  quote: "Jeremy brought creativity and strategy together in ways I didn't know were possible.",
  author: "Happy Client",
  role: "CEO, Tech Startup"
}, {
  quote: "The rare marketer who can actually code AND communicate. Unicorn status.",
  author: "Former Colleague",
  role: "Product Manager"
}, {
  quote: "Jeremy's work speaks for itself. Which is good because he won't stop talking otherwise.",
  author: "Definitely Real Person",
  role: "Testimonial Writer"
}];
const ProfilePage = () => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [singleClickCount, setSingleClickCount] = useState(0);
  const [readingTimeClicks, setReadingTimeClicks] = useState(0);
  const { toast } = useToast();
  const { discoverEgg } = useEasterEggs();
  const { trackDownload } = usePdfTracker();
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Easter egg: clicking reading time
  const handleReadingTimeClick = () => {
    const newCount = readingTimeClicks + 1;
    setReadingTimeClicks(newCount);
    
    const messages = [
      { title: "⏱️ Time is relative", description: "Einstein said that. Or was it a recruiter?" },
      { title: "⏱️ Still clicking?", description: "The reading time doesn't actually change, you know." },
      { title: "⏱️ Okay, I see you", description: "You really like clicking things, huh?" },
    ];
    
    if (newCount <= 3) {
      toast(messages[newCount - 1]);
    } else if (newCount === 5) {
      discoverEgg("time_lord");
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.2 },
      });
      toast({
        title: "⏰ Time Lord Achievement!",
        description: "You've mastered the art of wasting time productively. That's a skill!",
      });
      setReadingTimeClicks(0);
    }
  };
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("wearecleardigital@gmail.com");
    setEmailCopied(true);
    toast({
      title: "Email copied!",
      description: "Now go paste it somewhere useful!"
    });
    setTimeout(() => setEmailCopied(false), 2000);
  };
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/realness` : '/realness';
  const shareText = "Check out Jeremy Wright's interactive portfolio - it's unlike any resume you've seen!";
  const handleShare = async (platform: string) => {
    // Try native share first for mobile
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: "OMG Hire Me! - Jeremy Wright",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or error, fall through to copy
      }
    }
    
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
      case 'slack':
        url = `https://slack.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'teams':
        url = `https://teams.microsoft.com/share?href=${encodeURIComponent(shareUrl)}&msgText=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent("You HAVE to see this portfolio")}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        window.location.href = url;
        return;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share it with your favorite hiring manager 😉"
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
    setGalleryIndex(prev => (prev - 1 + avatarStages.length) % avatarStages.length);
  };
  const handleGalleryNext = () => {
    setGalleryIndex(prev => (prev + 1) % avatarStages.length);
  };
  const handleSubmit = async (subject: string) => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Hold up!",
        description: "I need at least your name and email to get back to you.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Hmm, that email looks sus...",
        description: "Please enter a valid email address so I can actually reply!",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message || "No message provided",
          subject
        }
      });
      if (error) throw error;

      // Celebrate with confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6
        }
      });
      toast({
        title: "Email sent! You lucky ducky!",
        description: "I'll get back to you faster than you can say 'full-stack marketer'."
      });
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Oops!",
        description: "Something went wrong. Try again or just email me directly!",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleAreYouSingle = () => {
    setSingleClickCount(prev => prev + 1);
    
    if (singleClickCount >= 4) {
      // Easter egg unlocked!
      discoverEgg("persistent_flirt");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff69b4', '#ff1493', '#ff6b6b'],
      });
      toast({
        title: "☕ Okay, okay!",
        description: "I'm happily happy and that's enough—now buy me a coffee!",
      });
      setSingleClickCount(0);
      return;
    }
    
    const responses = [
      "Not that kind of hiring! 😅",
      "Still not that kind of hiring! 🙄", 
      "Okay you're persistent... 🤔",
      "One more click and something might happen... 👀",
    ];
    
    toast({
      title: "COME ON!",
      description: responses[singleClickCount] || responses[0],
      variant: "destructive"
    });
  };
  return <div className="min-h-screen gradient-bg overflow-x-hidden print:bg-white print:text-black">
      <ThemeToggle />
      <div className="max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 py-8 sm:py-12">
        {/* Reading time indicator - clickable easter egg */}
        <div 
          onClick={handleReadingTimeClick}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground print:hidden cursor-pointer hover:text-foreground transition-colors"
        >
          <Clock className="w-4 h-4" />
          <span>~3 min read (or 47 min if you go down rabbit holes)</span>
        </div>

        {/* Avatar Section */}
        <section className="text-center space-y-4 animate-fade-in">
          <div onClick={handleAvatarClick} className="relative w-40 h-40 mx-auto rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform group shadow-xl print:shadow-none">
            {avatarStages[avatarIndex].image ? <img src={avatarStages[avatarIndex].image} alt={avatarStages[avatarIndex].label} className="w-full h-full object-cover" /> : <div className="w-full h-full gradient-primary flex items-center justify-center">
                <User className="w-20 h-20 text-primary-foreground" />
              </div>}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center print:hidden">
              <span className="text-xs text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium drop-shadow-lg">
                Click for more realness!
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Jeremy "Jay" Wright - Full-Stack Marketer</h1>
            <p className="text-sm sm:text-base text-muted-foreground">A real profile by a real boy, even if it's satire</p>
            <a 
              href="/about" 
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mt-1"
            >
              See more about Jay
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Avatar Gallery Modal */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-transparent shadow-none">
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button onClick={() => setIsGalleryOpen(false)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <X className="w-4 h-4 text-foreground" />
              </button>

              {/* Image */}
              <div className="relative aspect-square">
                <img src={avatarStages[galleryIndex].image} alt={avatarStages[galleryIndex].label} className="w-full h-full object-cover" />
                
                {/* Navigation arrows */}
                <button onClick={handleGalleryPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button onClick={handleGalleryNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Caption */}
              <div className="p-6 space-y-2 text-center">
                <div className="flex justify-center gap-2 mb-3">
                  {avatarStages.map((_, i) => <button key={i} onClick={() => setGalleryIndex(i)} className={cn("w-2 h-2 rounded-full transition-all", i === galleryIndex ? "bg-primary w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")} />)}
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
        <section className="animate-fade-in" style={{
        animationDelay: "0.1s"
      }}>
          <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-fun flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground" />
                  </div>
                  <div className="flex-1 sm:flex-initial">
                    <h3 className="font-display font-bold text-base sm:text-lg text-foreground">Work Love Language</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Discover how I collaborate best</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 w-full sm:w-auto sm:ml-auto" onClick={() => window.open("https://worklovelanguages.lovable.app", "_blank")}>
                  Take the Quiz
                  <ExternalLink className="ml-1 w-3 h-3" />
                </Button>
              </div>
              <img src={wllArchitect} alt="Work Love Language - The Architect: High-trust, self-directed execution" className="w-full rounded-lg shadow-md mt-4" />
            </CardContent>
          </Card>
        </section>

        {/* Unique Jeremy Things */}
        <section className="space-y-4 animate-fade-in" style={{
        animationDelay: "0.2s"
      }}>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center">
            Unique Jeremy Things
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {uniqueThings.map((thing, i) => <div key={i} className={cn("px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium shadow-md transition-all hover:scale-105 cursor-default", thing.type === "professional" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground")} style={{
            transform: `rotate(${thing.rotation}deg)`
          }}>
                {thing.text}
              </div>)}
          </div>
        </section>

        {/* Resume & Portfolio */}
        <section className="grid gap-4 animate-fade-in" style={{
        animationDelay: "0.3s"
      }}>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center">
            The Goods
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg hover-lift cursor-pointer group overflow-hidden" onClick={() => { trackDownload("resume"); window.open("/Jeremy_Wright_Resume.pdf", "_blank"); }}>
              <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-coral/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-coral" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Resume</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">PDF • Click to view</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover-lift cursor-pointer group overflow-hidden" onClick={() => { trackDownload("portfolio"); window.open("/Jeremy_Wright_Portfolio.pdf", "_blank"); }}>
              <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-teal" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Portfolio</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">PDF • Click to view</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button variant="outline" className="w-full" onClick={() => window.open("https://linkedin.com/in/jeremywright", "_blank")}>
            <Linkedin className="mr-2 w-4 h-4" />
            View LinkedIn Profile
            <ExternalLink className="ml-2 w-3 h-3" />
          </Button>
        </section>

        {/* Share This */}
        <section className="animate-fade-in" style={{
        animationDelay: "0.35s"
      }}>
          <Card className="border-2 border-dashed border-primary/30 bg-primary/5 overflow-hidden">
            <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Share2 className="w-5 h-5 text-primary shrink-0" />
                <h3 className="font-display font-bold text-sm sm:text-lg text-foreground">Know someone who should hire me?</h3>
              </div>
              <p className="text-sm text-muted-foreground">Sharing is caring (and gets me hired)</p>
              <div className="flex flex-wrap justify-center gap-3">
                {/* Native share for mobile */}
                {'share' in navigator && (
                  <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all gap-2 sm:hidden" onClick={() => handleShare('native')}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                )}
                <Button variant="outline" size="icon" className="rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all" onClick={() => handleShare('twitter')}>
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all" onClick={() => handleShare('linkedin')}>
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all" onClick={() => handleShare('facebook')}>
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-[#4A154B] hover:text-white hover:border-[#4A154B] transition-all" onClick={() => handleShare('slack')} title="Share to Slack">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-[#6264A7] hover:text-white hover:border-[#6264A7] transition-all" onClick={() => handleShare('teams')} title="Share to Teams">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all" onClick={() => handleShare('email')} title="Email to a colleague">
                  <Send className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" onClick={() => handleShare('copy')}>
                  <Link className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="space-y-4 animate-fade-in" style={{
        animationDelay: "0.4s"
      }}>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center">
            What People Say
          </h2>
          <Card className="relative overflow-hidden">
            <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg italic text-foreground">
                "{testimonials[testimonialIndex].quote}"
              </p>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  {testimonials[testimonialIndex].author}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {testimonials[testimonialIndex].role}
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {testimonials.map((_, i) => <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === testimonialIndex ? "bg-primary w-4" : "bg-muted")} />)}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setTestimonialIndex(prev => (prev + 1) % testimonials.length)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <a href="https://linkedin.com/in/jeremywright" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">(click to see the real testimonials on LinkedIn if you're bored)</a>
            </CardContent>
          </Card>
        </section>

        {/* Hire Me If / Don't Hire Me If */}
        <section className="grid sm:grid-cols-2 gap-4 animate-fade-in" style={{
        animationDelay: "0.5s"
      }}>
          <Card className="border-success/30 bg-success/5 hover-lift">
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-success flex items-center gap-2">
                ✓ Hire Me If
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You want someone who chases their dreams without screwing with others</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Telescope className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You need someone who sees the future (wrote the first global social media marketing book, like, evar)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You want someone who grows shiz (repeatedly, and to scale)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Cog className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">You want to make sure your $100k HubSpot (or other) implementation actually works before you hire a team to run it</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5 hover-lift">
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-destructive flex items-center gap-2">
                ✗ Don't Hire Me If
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Music className="w-4 h-4 sm:w-5 sm:h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">You don't like joy (I'm a musician, deal with it)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Banana className="w-4 h-4 sm:w-5 sm:h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">Memes aren't real life (I'm the "banana for scale" guy on Imgur)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">Geeks aren't sexy (sci-fi comedy writer — my mom says I'm funny!)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">You want a "Marketing Manager" to execute a pre-defined checklist; hire me if you need an Architect to build for your dream</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Contact Form */}
        <section className="space-y-4 animate-fade-in" style={{
        animationDelay: "0.6s"
      }}>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center">Let's Chat!</h2>
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Your name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="h-12" />
                  <Input type="email" placeholder="Your email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="h-12" />
                </div>
                <Textarea placeholder="What's on your mind? (optional)" value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} rows={3} />
                
                {/* Fun submit buttons */}
                <div className="space-y-3 pt-2">
                  <p className="text-center text-sm text-muted-foreground italic">
                    Select one — note there are only 4 wright answers
                  </p>
                  <div className="grid gap-2">
                    <Button type="button" onClick={() => handleSubmit("WTF - Confused but intrigued")} disabled={isSubmitting} variant="outline" className="w-full h-auto py-3 sm:py-4 text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-all whitespace-normal text-center">
                      WTF, I want to talk but IDK why
                    </Button>
                    <Button type="button" onClick={() => handleSubmit("Sigh, okay fine!")} disabled={isSubmitting} variant="outline" className="w-full h-auto py-3 sm:py-4 text-xs sm:text-sm hover:bg-secondary hover:text-secondary-foreground transition-all whitespace-normal text-center">
                      Sigh... okay, fine!
                    </Button>
                    <Button type="button" onClick={handleAreYouSingle} variant="outline" className="w-full h-auto py-3 sm:py-4 text-xs sm:text-sm hover:bg-destructive hover:text-destructive-foreground transition-all whitespace-normal text-center">
                      Are you single?
                    </Button>
                    <Button type="button" onClick={() => handleSubmit("Let's talk for realz")} disabled={isSubmitting} className="w-full gradient-primary text-primary-foreground hover:opacity-90 h-auto py-3 sm:py-4 text-xs sm:text-sm font-semibold whitespace-normal text-center">
                      <Send className="mr-2 w-4 h-4 shrink-0" />
                      Let's talk for realz, Jay
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    (That's what people call me in places that can't pronounce R's, okay?)
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground pt-2">
                    <span className="text-center">To get in touch directly, my super secret email is</span>
                    <div className="flex items-center gap-1">
                      <a href="mailto:wearecleardigital@gmail.com" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                        <span className="underline break-all">wearecleardigital@gmail.com</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <button onClick={handleCopyEmail} className="inline-flex items-center justify-center w-6 h-6 rounded-md hover:bg-muted transition-colors shrink-0" title="Copy email">
                        {emailCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pb-8 print:pt-8">
          <p>Made with ❤️ and a healthy dose of self-awareness.</p>
          <p className="mt-2 text-xs text-muted-foreground/50 print:hidden">
            <button 
              onClick={() => window.print()}
              className="hover:text-muted-foreground underline transition-colors"
            >
              Print this page
            </button>
            {" "}(for your fridge, obviously)
          </p>
        </footer>
        <Footer />
      </div>

      {/* Back to Top Button */}
      <button onClick={scrollToTop} className={cn("fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl z-50", showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")} aria-label="Back to top">
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>;
};
export default ProfilePage;