type Status = "IN_PROGRESS" | "COMPLETED" | "FAILED";

type ValidationStatus = "NOT_VALIDATED" | "VALIDATED" | "REJECTED";

interface User {
  name: string;
  email: string;
  id: number;
}

export interface ChildActivitiesModel {
  title: string;
  filename: string;
  pages_to_trim: string;
  split_count: number;
  status: Status;
  validation_status: ValidationStatus;
  is_extracted: boolean;
  id: number;
  user_id: number;
  master_id: number;
  price: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  user: User;
  master_title: string;
}

export interface ChildActivitiesResponse {
  total: number;
  result: ChildActivitiesModel[];
}

export interface ChildActivityModel {
  title: string;
  filename: string;
  data: Record<string, unknown>;
  coordinates: Record<string, unknown>;
  pages_to_trim: string;
  split_count: number;
  status: Status;
  validation_status: ValidationStatus;
  is_extracted: boolean;
  id: number;
  user_id: number;
  master_id: number;
  price: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  user: User;
  master_title: string;
  fields: DynamicField[];
  remarks?: string[];
}

export type ChildActivityResponse = ChildActivityModel;

export interface DynamicField {
  name: string;
  label: string;
  value: string;
  confidence?: number;
  message?: string;
}
