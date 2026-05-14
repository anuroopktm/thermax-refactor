export interface ThermaxMember {
  user_id: number;
  role: "OWNER" | "MEMBER" | null;
  thrmx_gpt_user_service_mapping: Record<string, string>[];
  id: number;
  is_active: boolean;
  created_on: string;
  created_by: number;
  last_modified_on: string;
  last_modified_by: number;
  name: string;
  email: string;
}

export interface ThermaxMembersResponse {
  total: number;
  result: ThermaxMember[];
}

export interface CreateThermaxMemberPayload {
  email: string;
  name: string;
  thrmx_gpt_user_service_mapping: Record<string, string>[];
  role: "OWNER" | "MEMBER" | null;
}

export interface UpdateThermaxMemberPayload {
  name?: string;
  role?: "OWNER" | "MEMBER" | null;
  thrmx_gpt_user_service_mapping?: Record<string, string>[];
}
