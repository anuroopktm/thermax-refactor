export interface Member {
  id: number;
  name: string;
  email: string;
  role: "owner" | "member" | "viewer";
}

export interface MemberWithCount {
  total: number;
  result: Member[];
}
