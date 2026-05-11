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
