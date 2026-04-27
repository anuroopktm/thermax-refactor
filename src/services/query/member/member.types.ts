export interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "member" | "viewer";
}

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
