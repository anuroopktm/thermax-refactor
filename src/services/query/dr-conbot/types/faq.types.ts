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
  filename: string;
  description: string;
  status: string;
  kind: string;
  createdOn: string;
  isActive: boolean;
  categoryId: number | null;
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
