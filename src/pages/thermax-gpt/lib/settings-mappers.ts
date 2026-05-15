import { type Member } from "@/services/query/sales-enablement/types/members.types";
import { type ThermaxMember } from "@/services/query/thermax-gpt/types";

export function normalizeThermaxMembers(members: ThermaxMember[]): Member[] {
  return members.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role?.toLowerCase() as "owner" | "member",
  }));
}
