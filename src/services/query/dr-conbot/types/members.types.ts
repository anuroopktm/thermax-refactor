export interface DrConbotMember {
  user_id: number;
  role: string | null;
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

export interface DrConbotMembersResponse {
  total: number;
  result: DrConbotMember[];
}

export interface CreateDrConbotMemberPayload {
  email: string;
  name: string;
  thrmx_gpt_user_service_mapping: Record<string, string>[];
  role: string;
}

export interface UpdateDrConbotMemberPayload {
  name?: string;
  role?: string;
  thrmx_gpt_user_service_mapping?: Record<string, string>[];
}
