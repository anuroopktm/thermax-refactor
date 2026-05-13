import { useEffect, useState } from "react";
import {
  Bot,
  Brain,
  Loader,
  MessageSquareDashed,
  Sparkles,
} from "lucide-react";

const THINKING_STATES = [
  {
    icon: Loader,
    text: "Thinking...",
    iconClass: "animate-spin",
  },
  {
    icon: Sparkles,
    text: "Generating response...",
    iconClass: "animate-pulse",
  },
  {
    icon: Brain,
    text: "Analyzing your request...",
    iconClass: "animate-pulse",
  },
  {
    icon: Bot,
    text: "Preparing answer...",
    iconClass: "animate-pulse",
  },
  {
    icon: MessageSquareDashed,
    text: "Typing response...",
    iconClass: "animate-pulse",
  },
] as const;

export function ThinkingIndicator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % THINKING_STATES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const current = THINKING_STATES[index];
  const Icon = current.icon;

  return (
    <div
      key={index}
      className="flex animate-in slide-in-from-bottom-2 fade-in items-center gap-2 duration-300"
    >
      <Icon className={`size-3.5 ${current.iconClass}`} />
      <span className="text-sm text-muted-foreground">{current.text}</span>
    </div>
  );
}
