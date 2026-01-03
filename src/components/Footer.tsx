import { Link } from "react-router-dom";
import { Code2, Linkedin, FileText, Briefcase, User } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 mt-8 border-t border-border/30 print:hidden">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
        <Link 
          to="/realness" 
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <User className="w-4 h-4" />
          Profile
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
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <FileText className="w-4 h-4" />
          Resume
        </a>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <a 
          href="/Jeremy_Wright_Portfolio.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Briefcase className="w-4 h-4" />
          Portfolio
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
