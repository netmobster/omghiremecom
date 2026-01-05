import { Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareAchievementProps {
  achievementName: string;
  variant?: "toast" | "inline";
}

const ShareAchievement = ({ achievementName, variant = "toast" }: ShareAchievementProps) => {
  const siteUrl = "https://jeremywright.lovable.app";
  const shareText = `I just unlocked the "${achievementName}" achievement on this hilarious portfolio site! 🎉`;
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  if (variant === "toast") {
    return (
      <div className="flex gap-1 mt-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-7 px-2 text-xs gap-1"
          onClick={shareToFacebook}
        >
          <Facebook className="w-3 h-3" />
          Share
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-7 px-2 text-xs gap-1"
          onClick={shareToLinkedIn}
        >
          <Linkedin className="w-3 h-3" />
          Share
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="gap-2"
        onClick={shareToFacebook}
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="gap-2"
        onClick={shareToLinkedIn}
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
    </div>
  );
};

export default ShareAchievement;
