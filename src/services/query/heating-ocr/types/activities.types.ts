export type ActivityStatus =
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "REJECTED"
  | "SUBMITTED_SUCCESS"
  | "SUBMITTED_FAILED"
  | "SUBMITTED_WAITING";

export type ActivityFileStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type ActivityTemplate = "Plate";

export interface ReducedUser {
  name: string;
  email: string;
  id: number;
}

export interface HeatingField {
  title: string;
  value: string;
  invalid_reason: string | null;
  is_valid: boolean;
}

export interface ActivityData {
  field?: HeatingField[] | HeatingField[][];
}

export interface HeatingActivityModel {
  title: string;
  filename: string;
  data: ActivityData | null;
  coordinates: Record<string, unknown> | null;
  template: ActivityTemplate | null;
  group: string[][] | null;
  status: ActivityStatus;
  file_status: ActivityFileStatus;
  id: number;
  user_id: number;
  price: number | null;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  user: ReducedUser;
}

export interface HeatingActivityResponse {
  total: number;
  result: HeatingActivityModel[];
}

export interface HeatingActivityUpdatePayload {
  title?: string | null;
  group?: string[] | null;
  data?: ActivityData | null;
}
