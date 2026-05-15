import type {
  ChatSource,
  GeneratedMedia,
  NormalizedMessage,
} from "@/components/shared/chat/types/chat.types";

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

interface ChatDocument {
  document_ids: string[];
  file_name: string;
  chunk_length: number;
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

export interface ChatUpdatePayload {
  title: string;
}

export interface ChatCreateResponse {
  title: string;
  type: string;
  id: number;
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
  thinking: boolean;
  model: string;
}

export type { ChatSource, GeneratedMedia, NormalizedMessage };
