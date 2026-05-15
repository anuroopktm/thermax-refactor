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

export interface ActivityYearUsageResponse {
  month: number[];
  activity: number[];
  total: number;
}

export interface CostUsageByYearResponse {
  month: number[];
  cost: number[];
  total: number;
}

export interface StatusStatsResponse {
  stat: string;
  activity_count: number;
}

export interface ActivityUsageStatusStatsResponse {
  result: StatusStatsResponse[];
}

export interface TopUserResponse {
  name: string;
  email: string;
  activity: number;
}

export interface ActivityUsageTopUserResponse {
  result: TopUserResponse[];
}

export interface LimitResponse {
  limit: number;
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
}

export interface LimitModel {
  limit: number;
}
