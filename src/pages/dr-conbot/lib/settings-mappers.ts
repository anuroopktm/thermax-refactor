import { type Member } from "@/services/query/shared/types/members.types";
import {
  type DrConbotMember,
  type CreateDrConbotMemberPayload,
  type UpdateDrConbotMemberPayload,
} from "@/services/query/dr-conbot/types";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  type CostUsageResponse,
  type CostUsageModel,
  type ActivityUsageResponse,
  type ActivityUsageModel,
  type TopUserResponse,
  type TopUserModel,
} from "@/services/query/dr-conbot/types/usage.types";

export function normalizeDrConbotMember(m: DrConbotMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
  };
}

export function normalizeDrConbotMembers(members: DrConbotMember[]): Member[] {
  return members.map(normalizeDrConbotMember);
}

/**
 * Maps UI form data to Dr-Conbot API creation payload
 */
export function mapToCreateMemberPayload(
  data: MemberForm,
): CreateDrConbotMemberPayload {
  return {
    name: data.name,
    email: data.email,
    role: data.role,
    thrmx_gpt_user_service_mapping: [], // Default empty mapping
  };
}

/**
 * Maps UI form data to Dr-Conbot API update payload
 */
export function mapToUpdateMemberPayload(
  data: MemberForm,
): UpdateDrConbotMemberPayload {
  return {
    name: data.name,
    role: data.role,
  };
}

export function mapCostUsageData(data: CostUsageResponse): CostUsageModel[] {
  if (!data?.day) return [];
  return data.day.map((dayNum, i) => ({
    label: `Day ${dayNum}`,
    value: data.cost?.[i] || 0,
  }));
}

export function mapActivityUsageData(
  data: ActivityUsageResponse,
): ActivityUsageModel[] {
  if (!data?.day) return [];
  return data.day.map((dayNum, i) => ({
    label: `Day ${dayNum}`,
    value: data.question?.[i] || 0,
  }));
}

export function mapTopUsersData(data: TopUserResponse[]): TopUserModel[] {
  return (
    data?.map((item) => ({
      name: item.name,
      value: item.question,
    })) || []
  );
}
