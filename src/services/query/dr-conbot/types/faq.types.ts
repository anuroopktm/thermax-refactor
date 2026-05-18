export interface DrConbotFaqResponse {
  description: string;
  kind: "MANUAL" | "FAQ" | "IMAGE" | "VIDEO" | "OTHER";
  id: number;
  filename: string;
  category_id: number | null;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  status: "STARTED" | "COMPLETED" | "FAILED";
  chunk_length: number | null;
  vector_ids: string[] | null;
}

export interface DrConbotFaqsResponse {
  total: number;
  result: DrConbotFaqResponse[];
}

export interface FaqModel {
  id: number;
  user: string;
  question: string;
  answer: string;
  status: string;
  source: string;
  filename: string;
  kind: string;
  createdOn: string;
}

export interface FaqCreatePayload {
  document: File;
  description: string;
  kind: string;
}

export interface FaqUpdatePayload {
  description?: string;
  kind?: string;
}

export interface CategoryDocumentLinkResponse {
  link: string;
}
