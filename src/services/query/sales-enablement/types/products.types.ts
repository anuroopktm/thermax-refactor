import { type ReducedProductModelResponse } from "./feedback.types";

export interface ProductResponse {
  title: string;
  short_title: string;
  description: string;
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  models: ReducedProductModelResponse[];
  total_document: number;
}

export interface ProductsListResponse {
  total: number;
  result: ProductResponse[];
}

export type DocumentKind = "MANUAL" | "BROCHURE" | "TECHNICAL_SPECIFICATION";
export type DocumentStatus = "STARTED" | "COMPLETED" | "FAILED";

export interface ProductDocumentResponse {
  description: string;
  kind: DocumentKind;
  id: number;
  filename: string;
  product_id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  status: DocumentStatus;
  models: ReducedProductModelResponse[] | null;
}

export interface ProductDocumentsListResponse {
  total: number;
  result: ProductDocumentResponse[];
}

export interface ProductDocumentLinkResponse {
  link: string;
}
