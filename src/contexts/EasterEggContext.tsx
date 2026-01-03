import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type EasterEgg = {
  id: string;
  name: string;
  description: string;
  hint: string;
  icon: string;
};

export const EASTER_EGGS: EasterEgg[] = [
  {
    id: "konami",
    name: "Konami Code Master",
    description: "Entered the legendary ↑↑↓↓←→←→BA sequence",
    hint: "Old school gamers know this one...",
    icon: "🎮",
  },
  {
    id: "hire",
    name: "Subliminal Messaging",
    description: "Typed the magic word 'hire' anywhere on the site",
    hint: "Sometimes you just have to say what you want...",
    icon: "💼",
  },
  {
    id: "sparkle",
    name: "Sparkle Master",
    description: "Clicked all the sparkles on the intro page",
    hint: "Shiny things deserve attention",
    icon: "✨",
  },
  {
    id: "time_lord",
    name: "Time Lord",
    description: "Clicked the reading time estimate way too many times",
    hint: "Time is relative, especially when you're procrastinating",
    icon: "⏰",
  },
  {
    id: "faq_nerd",
    name: "Thorough Researcher",
    description: "Opened every single FAQ question",
    hint: "Leave no question unturned",
    icon: "🎓",
  },
  {
    id: "persistent_flirt",
    name: "Persistent Romantic",
    description: "Kept clicking 'Are you single?' until something happened",
    hint: "Persistence pays off... or does it?",
    icon: "💕",
  },
];

type EasterEggContextType = {
  foundEggs: Set<string>;
  discoverEgg: (id: string) => void;
  hasFound: (id: string) => boolean;
  totalFound: number;
  totalEggs: number;
  justCompletedAll: boolean;
  clearJustCompleted: () => void;
  resetAll: () => void;
};

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

const STORAGE_KEY = "jeremy_easter_eggs";

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [foundEggs, setFoundEggs] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [justCompletedAll, setJustCompletedAll] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...foundEggs]));
  }, [foundEggs]);

  const discoverEgg = (id: string) => {
    setFoundEggs((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      // Check if this discovery completes the collection
      if (next.size === EASTER_EGGS.length) {
        setJustCompletedAll(true);
      }
      return next;
    });
  };

  const hasFound = (id: string) => foundEggs.has(id);
  
  const clearJustCompleted = () => setJustCompletedAll(false);
  
  const resetAll = () => {
    setFoundEggs(new Set());
    setJustCompletedAll(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <EasterEggContext.Provider
      value={{
        foundEggs,
        discoverEgg,
        hasFound,
        totalFound: foundEggs.size,
        totalEggs: EASTER_EGGS.length,
        justCompletedAll,
        clearJustCompleted,
        resetAll,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEggs = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error("useEasterEggs must be used within EasterEggProvider");
  }
  return context;
};
