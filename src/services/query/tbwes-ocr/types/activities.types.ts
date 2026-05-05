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
  status?: ActivityStatus;
  is_active?: boolean;
}
