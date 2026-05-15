import {
  type Activity,
  type ActivityWithCount,
} from "../../../services/query/tbwes-ocr/types";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { getInitials } from "@/lib/utils";

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
  const rawFields = (activity?.data as any)?.field as TbwesField[] | undefined;

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
) {
  const rawFields = (originalActivity?.data as any)?.field as
    | TbwesField[]
    | undefined;

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
export function mapTbwesQueryFilters(params: URLSearchParams) {
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
export function mapToMember(member: any) {
  return {
    ...member,
    id: member.id,
    role: member.role.toUpperCase() as "OWNER" | "MEMBER" | "VIEWER",
  };
}

/**
 * Maps the entire Members list response
 */
export function mapTbwesMembersResponse(data: any) {
  return {
    ...data,
    result: data.result.map(mapToMember),
  };
}
