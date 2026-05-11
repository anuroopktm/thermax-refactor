export type MemberRole = "OWNER" | "MEMBER";

export interface Member {
  user_id: number;
  role: MemberRole;
  id: string;
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
