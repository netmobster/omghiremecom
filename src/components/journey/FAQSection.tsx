import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { useEasterEggs } from "@/contexts/EasterEggContext";

const faqs = [
  {
    question: "Can you start Monday?",
    answer: "Define 'start.' Like, physically present? Mentally engaged? Emotionally invested? Because those are three very different Mondays.",
  },
  {
    question: "What's your salary expectation?",
    answer: "More than I'm worth, less than I deserve. Somewhere between 'ramen budget' and 'I can afford guac at Chipotle without thinking about it.'",
  },
  {
    question: "Where do you see yourself in 5 years?",
    answer: "Hopefully not answering this question again. But probably celebrating the success of whatever wild thing we built together.",
  },
  {
    question: "What's your greatest weakness?",
    answer: "I tend to make satirical portfolio websites instead of just sending a normal resume like a regular human being.",
  },
  {
    question: "Why should we hire you?",
    answer: "You've scrolled this far. That's either a sign of genuine interest or procrastination. Either way, I respect it.",
  },
  {
    question: "Do you have any questions for us?",
    answer: "Yes. Did you enjoy this experience? Because I had way too much fun building it.",
  },
];

const FAQSection = () => {
  const [openedFaqs, setOpenedFaqs] = useState<Set<string>>(new Set());
  const [allOpenedTriggered, setAllOpenedTriggered] = useState(false);
  const { toast } = useToast();
  const { discoverEgg } = useEasterEggs();

  const handleValueChange = (value: string) => {
    if (value && !openedFaqs.has(value)) {
      const newOpened = new Set(openedFaqs);
      newOpened.add(value);
      setOpenedFaqs(newOpened);

      // Easter egg: opened all FAQs
      if (newOpened.size === faqs.length && !allOpenedTriggered) {
        setAllOpenedTriggered(true);
        discoverEgg("faq_nerd");
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#34d399', '#6ee7b7'],
        });
        toast({
          title: "🎓 Thorough Researcher Badge!",
          description: "You read ALL the FAQs? You're either very thorough or very bored. Either way, hired!",
        });
      }
    }
  };

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.65s" }}>
      <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-sm text-muted-foreground italic">
        (The ones I'm tired of answering, answered with personality)
      </p>
      <Card>
        <CardContent className="p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full" onValueChange={handleValueChange}>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      {openedFaqs.size > 0 && !allOpenedTriggered && (
        <p className="text-center text-xs text-muted-foreground/50">
          {openedFaqs.size}/{faqs.length} FAQs explored... 👀
        </p>
      )}
    </section>
  );
};

export default FAQSection;
