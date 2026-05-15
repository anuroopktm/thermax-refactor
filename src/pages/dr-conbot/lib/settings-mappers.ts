import { type Member } from "@/services/query/sales-enablement/types/members.types";
import { type DrConbotMember } from "@/services/query/dr-conbot/types";

export function normalizeDrConbotMembers(members: DrConbotMember[]): Member[] {
  return members.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role?.toLowerCase() as "owner" | "member",
  }));
}
