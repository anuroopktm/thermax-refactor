export interface GeneratedMedia {
  media_type: string;
  link: string;
  chart_data: Record<string, any>;
}

export interface ChatSource {
  generated_media: GeneratedMedia[];
}

export interface NormalizedMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
  historyItemId?: number;
  source?: ChatSource;
}

export interface Chat {
  id: number;
  title: string;
}
