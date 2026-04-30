export type ActivityStatus =
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "REJECTED"
  | "SUBMITTED_SUCCESS"
  | "SUBMITTED_FAILED"
  | "SUBMITTED_WAITING";

export type ActivityFileStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED";

export interface ReducedUser {
  name: string;
  email: string;
  id: number;
}

export interface Activity {
  title: string;
  filename: string;
  data: Record<string, any> | null;
  coordinates: Record<string, any> | null;
  status: ActivityStatus;
  file_status: ActivityFileStatus;
  id: number;
  user_id: number;
  price: number | null;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  ack: string | null;
  lot: string | null;
  user: ReducedUser;
}

export interface ActivityWithCount {
  total: number;
  result: Activity[];
}

export interface ActivityUpdateInput {
  title?: string | null;
  data?: Record<string, any> | null;
}

export type MemberRole = "OWNER" | "MEMBER";

export interface Member {
  user_id: number;
  role: MemberRole;
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  name: string;
  email: string;
}

export interface MemberWithCount {
  total: number;
  result: Member[];
}

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
