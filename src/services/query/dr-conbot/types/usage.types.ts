export interface CostUsageResponse {
  day: number[];
  cost: number[];
  total: number;
}

export interface CostUsageModel {
  label: string;
  value: number;
}

export interface ActivityUsageResponse {
  day: number[];
  question: number[];
  total: number;
}

export interface ActivityUsageModel {
  label: string;
  value: number;
}

export interface TopUserResponse {
  name: string;
  email: string;
  question: number;
}

export interface ActivityUsageTopUserResponse {
  total: number;
  result: TopUserResponse[];
}

export interface TopUserModel {
  name: string;
  value: number;
}

export interface UsageLimitResponse {
  limit: number;
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
}

export interface UsageLimitModel {
  limit: number;
}

export interface UserDownloadRequest {
  from_date: string;
  to_date?: string;
}
