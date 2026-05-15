import { type Member } from "../../shared/types";

export type { Member };

export interface CreateMemberResponse {
  message: string;
  member: Member;
}

export interface UpdateMemberResponse {
  message: string;
  member: Member;
}

export interface DeleteMemberResponse {
  message: string;
}
