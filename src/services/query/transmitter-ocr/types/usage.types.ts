export interface ActivityUsageResponse {
  day: number[];
  activity: number[];
  total: number;
}

export interface ActivityUsageModel {
  label: string;
  value: number;
}

export interface CostUsageResponse {
  day: number[];
  cost: number[];
  total: number;
}

export interface CostUsageModel {
  label: string;
  value: number;
}

export interface TokenUsageModel {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}

export interface StatsItemResponse {
  stat: string;
  activity_count: number;
}

export interface StatsUsageResponse {
  result: StatsItemResponse[];
}

export interface StatsModel {
  name: string;
  value: number;
}

export interface TopUsersItemResponse {
  name: string;
  email: string;
  activity: number;
}

export interface TopUsersUsageResponse {
  result: TopUsersItemResponse[];
}

export interface TopUserModel {
  name: string;
  value: number;
}

export interface RemarkModel {
  key: string;
  value: string;
  isError: boolean;
}

export interface ActivitySummaryModel {
  id: number;
  serialNo: number;
  tagNumber: string;
  date: string;
  modelNumber: string;
  unit: string;
  lowerRange: string;
  upperRange: string;
  status: string;
  remarks: RemarkModel[];
}
