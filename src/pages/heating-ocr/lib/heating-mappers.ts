import {
  type Activity,
  type ActivityWithCount,
  type HeatingField,
  type Member as HeatingMember,
  type MemberWithCount,
} from "../../../services/query/heating-ocr/types";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { getInitials } from "@/lib/utils";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";
import { type Member } from "@/services/query/shared/types/members.types";
import {
  type CostUsageResponse,
  type CostUsageModel,
  type ActivityUsageResponse,
  type ActivityUsageModel,
  type ActivityUsageTopUserResponse,
  type ActivityUsageStatusStatsResponse,
} from "@/services/query/heating-ocr/types/usage.types";

export interface HeatingActivityItem extends ActivityItem {
  template: Activity["template"];
}

/**
 * Maps TBWES Activity Detail to DynamicForm fields
 */
export function mapHeatingToFields(activity?: Activity): DynamicField[] {
  const rawFields = activity?.data?.field;

  if (!rawFields) return [];

  const flattened = Array.isArray(rawFields[0])
    ? (rawFields as HeatingField[][]).flat()
    : (rawFields as HeatingField[]);

  return flattened.map((f) => ({
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
export function mapFieldsToHeatingUpdate(
  originalActivity: Activity | undefined,
  formValues: Record<string, string>,
): { data: { field: HeatingField[] | HeatingField[][] } } {
  const rawFields = originalActivity?.data?.field;

  if (!rawFields) return { data: { field: [] } };

  const updateFields = (
    fields: HeatingField[] | HeatingField[][],
  ): HeatingField[] | HeatingField[][] => {
    if (Array.isArray(fields[0])) {
      return (fields as HeatingField[][]).map((group) =>
        group.map((f) => ({
          ...f,
          value: formValues[f.title] || f.value,
        })),
      );
    }

    return (fields as HeatingField[]).map((f) => ({
      ...f,
      value: formValues[f.title] || f.value,
    }));
  };

  return {
    data: {
      field: updateFields(rawFields),
    },
  };
}

/**
 * Maps URL search params to API query filters
 */
export function mapHeatingQueryFilters(params: URLSearchParams): {
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
export function mapToActivityCard(activity: Activity): HeatingActivityItem {
  return {
    id: activity.id,
    title: activity.title,
    createdAt: activity.created_on,
    status: activity.status.replace(/_/g, " "),
    userInitials: getInitials(activity.user?.name),
    template: activity.template,
  };
}

/**
 * Maps the entire Activity list response
 */
export function mapHeatingActivitiesResponse(data: ActivityWithCount): {
  total: number;
  result: HeatingActivityItem[];
} {
  return {
    total: data.total,
    result: data.result.map(mapToActivityCard),
  };
}

/**
 * Maps raw API Member to UI model
 */
export function mapToMember(member: HeatingMember): Member {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
  };
}

/**
 * Maps the entire Members list response
 */
export function mapHeatingMembersResponse(data: MemberWithCount): {
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
