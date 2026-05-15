export interface ActivityUsageItem {
  day: number[];
  activity: number[];
  total: number;
}

export type ActivityUsageResponse = ActivityUsageItem;

export interface CostUsageItem {
  day: number[];
  cost: number[];
  total: number;
}

export type CostUsageResponse = CostUsageItem;

export interface TokenUsage {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}

export interface StatsItem {
  stat: string;
  activity_count: number;
}

export interface StatsUsage {
  result: StatsItem[];
}

export interface TopUsersItem {
  name: string;
  email: string;
  activity: number;
}

export interface TopUsersUsage {
  result: TopUsersItem[];
}

export interface ActivitySummaryItem {
  id: number;
  serialNo: number;
  tagNumber: string;
  date: string;
  modelNumber: string;
  unit: string;
  lowerRange: string;
  upperRange: string;
  status: string;
  remarks: string[];
}
