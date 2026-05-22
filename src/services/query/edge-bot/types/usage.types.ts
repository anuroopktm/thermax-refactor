export interface CostUsageResponse {
  day: number[];
  cost: number[];
  total: number;
}

export interface ActivityUsageResponse {
  day: number[];
  question: number[];
  total: number;
}

export interface RawTopUser {
  name: string;
  email: string;
  question: number; // Note: Edge bot uses question instead of value
}

export interface ActivityUsageTopUserResponse {
  result: RawTopUser[];
}

export interface CostItemResponse {
  label: string | number;
  value: number;
}

export interface CostModel {
  label: string;
  value: number;
}

export interface ActivityItemResponse {
  label: string | number;
  questions: number;
}

export interface ActivityModel {
  label: string;
  value: number;
}

export interface TokenUsageResponse {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}

export interface TokenUsageModel {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}

export interface TopUserResponse {
  name: string;
  email: string;
  initial: string;
  value: number;
}

export interface TopUserModel {
  name: string;
  email: string;
  initial: string;
  value: number;
}
