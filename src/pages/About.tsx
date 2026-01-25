import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Megaphone, Target, Rocket, TrendingUp, Users, Crown, Zap, Package, BarChart3, Bot, RefreshCcw, Heart, Sparkles, Handshake, FileText, Briefcase, Linkedin, ExternalLink, Award, GraduationCap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import avatarLinkedin from "@/assets/avatar-linkedin.jpg";
import { usePdfTracker } from "@/hooks/usePdfTracker";
const skills = [{
  name: "Marketing",
  icon: Megaphone,
  description: "Full-funnel strategy & execution"
}, {
  name: "Strategy",
  icon: Target,
  description: "Business & go-to-market planning"
}, {
  name: "Startups & Agencies",
  icon: Rocket,
  description: "Built & scaled both"
}, {
  name: "Growth",
  icon: TrendingUp,
  description: "Data-driven acquisition & retention"
}, {
  name: "Team Building",
  icon: Users,
  description: "Hiring, mentoring, culture"
}, {
  name: "Leadership",
  icon: Crown,
  description: "Cross-functional & executive"
}, {
  name: "GTM",
  icon: Zap,
  description: "Launch strategy & positioning"
}, {
  name: "Product Marketing",
  icon: Package,
  description: "Messaging, positioning, enablement"
}, {
  name: "Data & Insights",
  icon: BarChart3,
  description: "Analytics & attribution"
}, {
  name: "AI & Automation",
  icon: Bot,
  description: "Efficiency at scale"
}, {
  name: "RevOps",
  icon: RefreshCcw,
  description: "Sales, marketing, ops alignment"
}, {
  name: "Customer Experience",
  icon: Heart,
  description: "Journey optimization"
}, {
  name: "Brand Strategy",
  icon: Sparkles,
  description: "Identity & positioning"
}, {
  name: "Partnerships",
  icon: Handshake,
  description: "Alliances & business dev"
}];
const certifications = [{
  category: "Platform & Tools",
  icon: Award,
  items: ["HubSpot Inbound Marketing", "HubSpot Content Marketing", "HubSpot Email Marketing", "HubSpot Marketing Software", "Google Analytics 4 (GA4)", "Google Ads (Search, Display, Video)", "Meta Blueprint", "Semrush SEO Toolkit"]
}, {
  category: "Strategy & Leadership",
  icon: GraduationCap,
  items: ["PMP (Project Management Professional) - PMI", "AMA Professional Certified Marketer (PCM)"]
}, {
  category: "AI & Emerging Tech",
  icon: Bot,
  items: ["HubSpot AI for Marketers", "Google AI Essentials"]
}, {
  category: "Agency & Partner",
  icon: Handshake,
  items: ["Google Partner Certified", "HubSpot Solutions Partner"]
}];
const links = [{
  name: "Resume (PDF)",
  href: "/Jeremy_Wright_Resume.pdf",
  icon: FileText,
  external: true,
  pdfType: "resume" as const
}, {
  name: "Portfolio (PDF)",
  href: "/Jeremy_Wright_Portfolio.pdf",
  icon: Briefcase,
  external: true,
  pdfType: "portfolio" as const
}, {
  name: "LinkedIn",
  href: "https://linkedin.com/in/jeremywright",
  icon: Linkedin,
  external: true,
  pdfType: null
}];
const About = () => {
  const {
    trackDownload
  } = usePdfTracker();
  return <div className="min-h-screen gradient-bg">
      <ThemeToggle />
      <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Journey
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start animate-fade-in">
          <div className="shrink-0">
            <img src={avatarLinkedin} alt="Jeremy Wright" className="w-48 h-48 rounded-2xl object-cover shadow-xl border-4 border-background" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Jeremy Wright
            </h1>
            <p className="text-lg text-primary font-medium">
              Full-Stack Marketer & Growth Leader
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">I'm a marketing leader with 20+ years of experience spanning startups, agencies, and enterprise. I've built and led teams, launched products, scaled companies, and developed strategies that actually work. My superpower is connecting the dots between brand, product, data, and revenue — and making it all feel human. </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Army veteran. HubSpot certified (too many times). Dad joke enthusiast. 
              I believe great marketing tells the truth in an interesting way, and that the best teams 
              are built on trust, autonomy, and a shared sense of humor.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {links.map(link => <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => link.pdfType && trackDownload(link.pdfType)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-sm font-medium text-foreground">
              <link.icon className="w-4 h-4 text-primary" />
              {link.name}
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </a>)}
        </div>

        {/* Skills Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center md:text-left">
            What I Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill, index) => <Card key={skill.name} className="hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{
            animationDelay: `${index * 50}ms`
          }}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <skill.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center md:text-left">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => <Card key={cert.category} className="hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <cert.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">{cert.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.items.map(item => <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Philosophy Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">
              My Philosophy
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">On Marketing:</strong> The best marketing doesn't feel like marketing. 
                It's storytelling that resonates, positioned at the right moment, for the right audience.
              </p>
              <p>
                <strong className="text-foreground">On Leadership:</strong> I hire people smarter than me, give them 
                context instead of commands, and get out of their way. My job is to remove obstacles and celebrate wins.
              </p>
              <p>
                <strong className="text-foreground">On Growth:</strong> Sustainable growth comes from understanding your 
                customers deeply, not from growth hacks. The fundamentals never go out of style.
              </p>
            </div>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </div>;
};
export default About;