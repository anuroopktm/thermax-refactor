export interface CostUsage {
  day: number[];
  cost: number[];
  total: number;
}

export interface ActivityUsage {
  day: number[];
  question: number[];
  total: number;
}

export interface TopUser {
  name: string;
  email: string;
  question: number;
}

export interface ActivityUsageTopUserResponse {
  total: number;
  result: TopUser[];
}

export interface UsageLimit {
  limit: number;
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
}

export interface UserDownloadRequest {
  from_date: string;
  to_date?: string;
}
