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
  created_on: string;
  status: string;
  userInitials?: string;
  type?: string;
  device_type?: string;
  template?: string;
  filename?: string;
}

export interface ChildActivityItem {
  id: string;
  title: string;
  created_on: string;
  status: string;
  userInitials?: string;
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

export interface CostUsageItem {
  period: string;
  cost: number;
}

export interface ActivityStats {
  total: number;
  passed: number;
  failed: number;
  inProgress?: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "member" | "viewer";
}

export interface MemberWithCount {
  total: number;
  result: Member[];
}

export interface TokenUsage {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}
