export type ChatFeedbackStatus =
  | "NOT_REVIEWED"
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED";

export interface ReducedUserResponse {
  name: string;
  email: string;
  id: number;
}

export interface ReducedProductResponse {
  title: string;
  id: number;
}

export interface ReducedProductModelResponse {
  title: string;
  id: number | null;
}

export interface ChatFeedbackResponse {
  updated_question: string;
  updated_answer: string;
  status: ChatFeedbackStatus;
  id: number;
  chat_history_id: number;
  status_last_modified_on: string;
  status_last_modified_by: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  products: ReducedProductResponse[] | null;
  models: ReducedProductModelResponse[] | null;
  created_by_user: ReducedUserResponse;
  last_modified_by_user: ReducedUserResponse;
  status_last_modified_by_user: ReducedUserResponse;
  question: string;
  answer: string;
  like: boolean | null;
  dislike_reason: string | null;
}

export interface ChatFeedbackListResponse {
  total_not_reviewed: number;
  total_in_review: number;
  total_approved: number;
  total_rejected: number;
  total: number;
  result: ChatFeedbackResponse[];
}
