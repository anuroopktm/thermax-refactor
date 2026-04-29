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

export interface ActivitySummaryItem {
  id: string;
  serialNo: number;
  tagNumber: string;
  date: string;
  modelNumber: string;
  unit: string;
  lowerRange: string;
  upperRange: string;
  status: "PASSED" | "FAILED";
  remarks: string[];
}

export interface MasterActivityItem {
  id: string;
  title: string;
  createdAt: string;
  status: string;
  userInitials: string;
}

export interface ChildActivityItem {
  id: string;
  title: string;
  createdAt: string;
  status: string;
  userInitials: string;
}

export interface ActivityItemDetail {
  id: string;
  name: string;
  fields: DynamicField[];
}

export interface MasterDataRecord {
  id: string;
  serialNo: number;
  tagNumber: string;
  modelNumber: string;
  lowerRange: string;
  upperRange: string;
  unit: string;
}
