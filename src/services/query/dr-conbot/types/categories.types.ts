export interface DrConbotCategoryResponse {
  id: number;
  title: string;
  short_title: string | null;
  description: string;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  total_document: number;
}

export interface DrConbotCategoriesResponse {
  total: number;
  result: DrConbotCategoryResponse[];
}

export interface DrConbotCategoryDocumentResponse {
  id: number;
  filename: string;
  description: string | null;
  kind: "MANUAL" | "FAQ" | "IMAGE" | "VIDEO" | "OTHER";
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

export interface DrConbotCategoryDocumentsResponse {
  total: number;
  result: DrConbotCategoryDocumentResponse[];
}

export interface CategoryFileModel {
  id: string;
  name: string;
  type: string;
  status: "STARTED" | "COMPLETED" | "FAILED";
  description: string;
  kind: string;
}

export interface CategoryModel {
  id: string;
  name: string;
  description: string;
  short_title: string;
  fileCount: number;
  files: CategoryFileModel[];
}

export interface CategoryCreatePayload {
  title: string;
  description: string;
  short_title?: string | null;
}

export interface CategoryUpdatePayload {
  title?: string;
  description?: string;
  short_title?: string | null;
}

export interface CategoryDocumentLinkResponse {
  link: string;
}
