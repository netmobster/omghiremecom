import { Link } from "react-router-dom";
import { Egg } from "lucide-react";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import { cn } from "@/lib/utils";

const EasterEggIcon = () => {
  const { totalFound, totalEggs } = useEasterEggs();
  const hasFoundAny = totalFound > 0;
  const allFound = totalFound === totalEggs;

  // Show totalFound + 1 when all eggs are found (super secret achievement)
  const displayTotal = allFound ? totalEggs + 1 : totalEggs;
  const displayFound = allFound ? totalFound + 1 : totalFound;

  return (
    <Link
      to="/secrets"
      className={cn(
        "fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full",
        "bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg",
        "hover:scale-105 hover:bg-card transition-all duration-200",
        "print:hidden"
      )}
      title="Secret Achievements"
    >
      <Egg 
        className={cn(
          "w-5 h-5 transition-colors animate-bounce",
          allFound ? "text-yellow-500" : hasFoundAny ? "text-primary" : "text-muted-foreground"
        )} 
      />
      <span className={cn(
        "text-sm font-medium",
        allFound ? "text-yellow-500" : hasFoundAny ? "text-foreground" : "text-muted-foreground"
      )}>
        {displayFound}/{displayTotal}
        {allFound && <span className="text-xs ml-1 opacity-80">...wait what?</span>}
      </span>
    </Link>
  );
};

export default EasterEggIcon;
