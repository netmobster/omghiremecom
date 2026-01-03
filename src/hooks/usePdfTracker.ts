import { useState, useEffect, useCallback } from "react";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const PDF_TRACKER_KEY = "pdf_downloads";

type PdfType = "resume" | "portfolio";

export const usePdfTracker = () => {
  const [downloads, setDownloads] = useState<Set<PdfType>>(() => {
    try {
      const stored = localStorage.getItem(PDF_TRACKER_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const { discoverEgg, hasFound } = useEasterEggs();
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(PDF_TRACKER_KEY, JSON.stringify([...downloads]));
  }, [downloads]);

  const trackDownload = useCallback((type: PdfType) => {
    setDownloads((prev) => {
      const next = new Set(prev);
      next.add(type);
      
      // Check if both PDFs have been downloaded
      if (next.has("resume") && next.has("portfolio") && !hasFound("resume_stalker")) {
        discoverEgg("resume_stalker");
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
        });
        toast({
          title: "📎 Resume Stalker Achievement!",
          description: "You downloaded BOTH files? Now that's thorough research!",
        });
      }
      
      return next;
    });
  }, [discoverEgg, hasFound, toast]);

  return { trackDownload };
};