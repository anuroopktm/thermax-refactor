export interface ChatResponse {
  id: number;
  title: string;
  user_id: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
}

export interface ChatsListResponse {
  total: number;
  result: ChatResponse[];
}

export interface SourceResponse {
  product_id?: number | null;
  product_document_id?: number | null;
  link?: string | null;
  qa_knowledge_id?: number | null;
  name: string;
  feedback_knowledge_id?: number | null;
}

export interface ChatHistorySourceResponse {
  sources: SourceResponse[];
}

export interface ChatHistoryResponse {
  human: string;
  human_rewrite: string;
  ai: string;
  like: boolean | null;
  dislike_reason: string | null;
  source: ChatHistorySourceResponse | null;
  price: number | null;
  id: number;
  chat_id: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
}

export interface ChatHistoryListResponse {
  total: number;
  result: ChatHistoryResponse[];
}

export interface SimilarQuestionResponse {
  question: string;
  answer: string;
}

export interface SimilarQuestionsListResponse {
  result: SimilarQuestionResponse[];
  total: number;
}
