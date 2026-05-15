import {
  type Activity,
  type ActivityWithCount,
  type Member,
  type HeatingField,
} from "../../../services/query/heating-ocr/types";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { getInitials } from "@/lib/utils";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";

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
) {
  const rawFields = originalActivity?.data?.field;

  if (!rawFields) return { data: { field: [] } };

  const updateFields = (fields: HeatingField[] | HeatingField[][]): any => {
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
export function mapHeatingQueryFilters(params: URLSearchParams) {
  const q = params.get("q");
  const user = params.get("user");
  const status = params.get("status");

  return {
    search_term: q,
    user_status: user === "ALL" ? undefined : user,
    status: status === "ALL" ? undefined : status,
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
export function mapHeatingActivitiesResponse(data: ActivityWithCount) {
  return {
    ...data,
    result: data.result.map(mapToActivityCard),
  };
}

/**
 * Maps raw API Member to UI model
 */
export function mapToMember(member: Member & { name: string; email: string }) {
  return {
    ...member,
    id: member.id,
    role: member.role.toLowerCase() as "owner" | "member" | "viewer",
  };
}

/**
 * Maps the entire Members list response
 */
export function mapHeatingMembersResponse(data: {
  total: number;
  result: (Member & { name: string; email: string })[];
}) {
  return {
    ...data,
    result: data.result.map(mapToMember),
  };
}
