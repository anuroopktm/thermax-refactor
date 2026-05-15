import { type Member } from "@/services/query/shared/types";
import {
  type ThermaxMember,
  type CreateThermaxMemberPayload,
  type UpdateThermaxMemberPayload,
} from "@/services/query/thermax-gpt/types";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  type CostUsageResponse,
  type CostUsageModel,
  type ActivityUsageResponse,
  type ActivityUsageModel,
  type TopUserResponse,
  type TopUserModel,
} from "@/services/query/thermax-gpt/types";

export function normalizeThermaxMember(m: ThermaxMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
  };
}

export function normalizeThermaxMembers(members: ThermaxMember[]): Member[] {
  return members.map(normalizeThermaxMember);
}

/**
 * Maps UI form data to Thermax-GPT API creation payload
 */
export function mapToCreateMemberPayload(
  data: MemberForm,
): CreateThermaxMemberPayload {
  return {
    name: data.name,
    email: data.email,
    role: data.role as "OWNER" | "MEMBER",
    thrmx_gpt_user_service_mapping: [], // Default empty mapping
  };
}

/**
 * Maps UI form data to Thermax-GPT API update payload
 */
export function mapToUpdateMemberPayload(
  data: MemberForm,
): UpdateThermaxMemberPayload {
  return {
    name: data.name,
    role: data.role as "OWNER" | "MEMBER",
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
