import {
  type Activity,
  type ActivityWithCount,
  type Member as TbwesMember,
  type MemberWithCount,
} from "../../../services/query/tbwes-ocr/types";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { getInitials } from "@/lib/utils";
import { type Member } from "@/services/query/shared/types/members.types";
import {
  type CostUsageResponse,
  type CostUsageModel,
  type ActivityUsageResponse,
  type ActivityUsageModel,
  type ActivityUsageTopUserResponse,
  type ActivityUsageStatusStatsResponse,
} from "@/services/query/tbwes-ocr/types/usage.types";

/**
 * TBWES OCR Field structure from API
 */
export interface TbwesField {
  title: string;
  value: string;
  invalid_reason: string | null;
  is_valid: boolean;
}

/**
 * Maps TBWES Activity Detail to DynamicForm fields
 */
export function mapTbwesToFields(activity?: Activity): DynamicField[] {
  const rawFields = (activity?.data as Record<string, unknown>)?.field as
    | TbwesField[]
    | undefined;

  if (!rawFields) return [];

  return rawFields.map((f) => ({
    name: f.title,
    label: f.title,
    value: f.value,
    message: f.invalid_reason || undefined,
    status: f.is_valid ? "success" : "error",
    confidence: f.is_valid ? 1 : 0.5,
  }));
}

/**
 * Maps Form values back to the API structure for updates
 */
export function mapFieldsToTbwesUpdate(
  originalActivity: Activity | undefined,
  formValues: Record<string, string>,
): { data: { field: TbwesField[] } } {
  const rawFields = (originalActivity?.data as Record<string, unknown>)
    ?.field as TbwesField[] | undefined;

  if (!rawFields) return { data: { field: [] } };

  return {
    data: {
      field: rawFields.map((f) => ({
        ...f,
        value: formValues[f.title] || f.value,
      })),
    },
  };
}

/**
 * Maps URL search params to API query filters
 */
export function mapTbwesQueryFilters(params: URLSearchParams): {
  search_term: string | null;
  user_status?: string;
  status?: string;
} {
  const q = params.get("q");
  const user = params.get("user");
  const status = params.get("status");

  return {
    search_term: q,
    user_status: user === "ALL" ? undefined : (user ?? undefined),
    status: status === "ALL" ? undefined : (status ?? undefined),
  };
}

/**
 * Maps raw API Activity to the UI model used by SharedActivityCard
 */
export function mapToActivityCard(activity: Activity) {
  return {
    ...activity,
    id: activity.id,
    createdAt: activity.created_on,
    status: activity.status.replace(/_/g, " "),
    userInitials: getInitials(activity.user?.name),
  };
}

/**
 * Maps the entire Activity list response
 */
export function mapTbwesActivitiesResponse(data: ActivityWithCount) {
  return {
    ...data,
    result: data.result.map(mapToActivityCard),
  };
}

/**
 * Maps raw API Member to UI model
 */
export function mapToMember(member: TbwesMember): Member {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role as "owner" | "member",
  };
}

/**
 * Maps the entire Members list response
 */
export function mapTbwesMembersResponse(data: MemberWithCount): {
  total: number;
  result: Member[];
} {
  return {
    total: data.total,
    result: data.result.map(mapToMember),
  };
}

/**
 * Maps raw API Cost Usage to UI model
 */
export function mapCostUsageData(data: CostUsageResponse): CostUsageModel[] {
  if (!data?.day) return [];
  return data.day.map((dayNum, i) => ({
    label: String(dayNum),
    value: data.cost?.[i] || 0,
  }));
}

/**
 * Maps raw API Activity Usage to UI model
 */
export function mapActivityUsageData(
  data: ActivityUsageResponse,
): ActivityUsageModel[] {
  if (!data?.day) return [];
  return data.day.map((dayNum, i) => ({
    label: String(dayNum),
    value: data.activity?.[i] || 0,
  }));
}

/**
 * Maps raw API Top Users to UI model
 */
export function mapTopUsersData(
  data: ActivityUsageTopUserResponse,
): { name: string; value: number }[] {
  return (
    data?.result.map((user) => ({
      name: user.name,
      value: user.activity,
    })) || []
  );
}

/**
 * Maps raw API Activity Status Stats to UI model
 */
export function mapActivityStatsData(
  data: ActivityUsageStatusStatsResponse,
): { name: string; value: number }[] {
  return (
    data?.result.map((stat) => ({
      name: stat.stat.replace(/_/g, " "),
      value: stat.activity_count,
    })) || []
  );
}
