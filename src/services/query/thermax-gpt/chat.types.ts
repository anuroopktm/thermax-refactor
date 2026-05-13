export interface ChatItem {
  id: number;
  title: string;
  type: string | null;
  user_id: number;
  thread_id: string | null;
  is_active: boolean;
  created_on: string;
}

export interface ChatResponse {
  total: number;
  result: ChatItem[];
}

interface GeneratedMedia {
  media_type: string;
  link: string;
  chart_data: Record<string, any>;
}

interface ChatDocument {
  document_ids: string[];
  file_name: string;
  chunk_length: number;
}

interface ChatSource {
  generated_media: GeneratedMedia[];
}

export interface ChatHistoryItem {
  human: string;
  human_rewrite: string;
  document_ids: string[];
  ai: string;
  like: boolean;
  dislike_reason: string;
  price: number;
  source: ChatSource;
  image_count: number;
  video_count: number;
  last_response_id: string;
  id: number;
  chat_id: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  document: ChatDocument;
  type: string;
}

export interface ChatHistoryResponse {
  total: number;
  result: ChatHistoryItem[];
}

export interface ChatCreatePayload {
  title: string;
  type: string;
}

export interface ChatCreateResponse {
  title: string;
  type: string;
  id: string;
  user_id: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  thread_id: string;
}

export interface CreateChatHistoryPayload {
  chatId: string;
  human: string;
  files?: File[];
  thinking?: boolean;
}

export interface NormalizedMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
  historyItemId?: number;
  source?: ChatSource;
}
