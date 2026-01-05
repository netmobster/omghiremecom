import { useToast } from "@/hooks/use-toast";
import ShareAchievement from "@/components/ShareAchievement";

interface AchievementToastOptions {
  title: string;
  description: string;
  achievementName: string;
}

export const useAchievementToast = () => {
  const { toast } = useToast();

  const showAchievementToast = ({ title, description, achievementName }: AchievementToastOptions) => {
    toast({
      title,
      description: (
        <div>
          <p>{description}</p>
          <ShareAchievement achievementName={achievementName} variant="toast" />
        </div>
      ),
      duration: 8000, // Longer duration to give time to share
    });
  };

  return { showAchievementToast };
};
