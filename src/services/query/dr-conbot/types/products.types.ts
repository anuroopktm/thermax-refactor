export interface DrConbotProductResponse {
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

export interface DrConbotProductsResponse {
  total: number;
  result: DrConbotProductResponse[];
}

export interface DrConbotProductDocumentResponse {
  id: number;
  filename: string;
  description: string | null;
  kind: "MANUAL" | "FAQ" | "IMAGE" | "VIDEO" | "OTHER";
  product_id: number | null;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  status: "STARTED" | "COMPLETED" | "FAILED";
  chunk_length: number | null;
  vector_ids: string[] | null;
}

export interface DrConbotProductDocumentsResponse {
  total: number;
  result: DrConbotProductDocumentResponse[];
}

export interface ProductFileModel {
  id: string;
  name: string;
  type: string;
  status: "STARTED" | "COMPLETED" | "FAILED";
  description: string;
  kind: string;
}

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  models: string;
  fileCount: number;
  files: ProductFileModel[];
}

export interface ProductCreatePayload {
  title: string;
  short_title: string | null;
  description: string;
}

export interface ProductUpdatePayload {
  title?: string;
  short_title?: string | null;
  description?: string;
}

export interface ProductDocumentLinkResponse {
  link: string;
}
