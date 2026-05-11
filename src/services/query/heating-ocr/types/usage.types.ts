export interface ActivityUsage {
  day: number[];
  activity: number[];
  total: number;
}

export interface CostUsage {
  day: number[];
  cost: number[];
  total: number;
}

export interface ActivityYearUsage {
  month: number[];
  activity: number[];
  total: number;
}

export interface CostUsageByYear {
  month: number[];
  cost: number[];
  total: number;
}

export interface StatusStats {
  stat: string;
  activity_count: number;
}

export interface ActivityUsageStatusStats {
  result: StatusStats[];
}

export interface TopUser {
  name: string;
  email: string;
  activity: number;
}

export interface ActivityUsageTopUser {
  result: TopUser[];
}

export interface Limit {
  limit: number;
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
}
