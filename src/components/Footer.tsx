import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 mt-8 border-t border-border/30 print:hidden">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
        <Link 
          to="/how-built" 
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Code2 className="w-4 h-4" />
          How this was built
        </Link>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <a 
          href="https://lovable.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Made with Lovable
        </a>
      </div>
    </footer>
  );
};

export default Footer;
