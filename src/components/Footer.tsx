import { Link } from "react-router-dom";
import { Code2, Linkedin, FileText, Briefcase, User, Home, UserCircle } from "lucide-react";
import { usePdfTracker } from "@/hooks/usePdfTracker";

const Footer = () => {
  const { trackDownload } = usePdfTracker();

  return (
    <footer className="py-6 mt-8 border-t border-border/30 print:hidden">
      <div className="text-center text-sm text-muted-foreground mb-4">
        <span className="font-medium text-foreground">What I do:</span>{" "}
        Marketing • Strategy • Startups & Agencies • Growth{" "}
        <Link to="/about" className="text-primary hover:underline">and more →</Link>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
        <Link 
          to="/" 
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <Link 
          to="/realness" 
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <User className="w-4 h-4" />
          The Profile
        </Link>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <Link 
          to="/about" 
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <UserCircle className="w-4 h-4" />
          About Me
        </Link>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <Link 
          to="/how-built" 
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Code2 className="w-4 h-4" />
          How this was built
        </Link>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <a 
          href="/Jeremy_Wright_Resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackDownload("resume")}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <FileText className="w-4 h-4" />
          Resume (PDF)
        </a>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <a 
          href="/Jeremy_Wright_Portfolio.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackDownload("portfolio")}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Briefcase className="w-4 h-4" />
          Portfolio (PDF)
        </a>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <a 
          href="https://linkedin.com/in/jeremywright" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
