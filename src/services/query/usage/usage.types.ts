export interface ActivityItem {
  day: number;
  questions: number;
}

export interface TopUser {
  name: string;
  email: string;
  value: number;
  initial: string;
}

export interface CostItem {
  day: number;
  cost: number;
}

export interface TokenUsage {
  used: number;
  remaining: number;
  totalSpent: number;
  limit: number;
}
