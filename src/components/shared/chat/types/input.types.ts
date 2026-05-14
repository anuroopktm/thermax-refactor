export type Model = {
  id: string;
  label: string;
  description?: string;
  thinking: boolean;
};

export const MODELS: Model[] = [
  {
    id: "o3",
    label: "Thinking",
    description: "Advanced reasoning model",
    thinking: true,
  },
  {
    id: "gpt-4.1",
    label: "GPT",
    description: "Fast & capable",
    thinking: false,
  },
  {
    id: "claude-3.7-sonnet",
    label: "Sonnet",
    description: "Strong writing & analysis",
    thinking: true,
  },
];
