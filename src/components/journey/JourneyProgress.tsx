interface JourneyProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Welcome",
  "Compatibility",
  "The Ask",
  "About You",
  "The Reveal"
];

const JourneyProgress = ({ currentStep, totalSteps }: JourneyProgressProps) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border/50">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-foreground">
          {stepLabels[currentStep - 1]}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="flex gap-1 ml-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i < currentStep
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyProgress;
