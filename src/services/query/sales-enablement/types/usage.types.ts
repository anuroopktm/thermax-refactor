export interface CostItem {
  label: string | number;
  value: number;
}

export interface ActivityItem {
  label: string | number;
  questions: number;
}

export interface TokenUsage {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}

export interface TopUser {
  name: string;
  email: string;
  initial: string;
  value: number;
}
