export type FieldStatus = "success" | "warning" | "error" | "info";

export interface DynamicField {
  name: string;
  label: string;
  value: string;
  confidence?: number;
  status?: FieldStatus;
  message?: string;
  type?: "text" | "number";
}

export interface ChildActivityItemDetail {
  id: string;
  name: string;
  fields: DynamicField[];
}
