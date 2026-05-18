import { type Member } from "@/services/query/shared/types";
import {
  type DrConbotMember,
  type CreateDrConbotMemberPayload,
  type UpdateDrConbotMemberPayload,
  type DrConbotCategoryResponse,
  type CategoryModel,
  type DrConbotCategoryDocumentResponse,
  type CategoryFileModel,
  type DrConbotFaqResponse,
  type FaqModel,
} from "@/services/query/dr-conbot/types";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  type CostUsageResponse,
  type CostUsageModel,
  type ActivityUsageResponse,
  type ActivityUsageModel,
  type TopUserResponse,
  type TopUserModel,
} from "@/services/query/dr-conbot/types";

export function normalizeDrConbotMember(m: DrConbotMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role || "",
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

export function normalizeCategoryDocument(
  doc: DrConbotCategoryDocumentResponse,
): CategoryFileModel {
  return {
    id: String(doc.id),
    name: doc.filename,
    type: doc.filename.split(".").pop() || "",
    status: doc.status,
    description: doc.description || "",
    kind: doc.kind,
  };
}

export function normalizeCategoryDocuments(
  docs: DrConbotCategoryDocumentResponse[],
): CategoryFileModel[] {
  return docs ? docs.map(normalizeCategoryDocument) : [];
}

export function normalizeCategory(
  p: DrConbotCategoryResponse,
  docs: DrConbotCategoryDocumentResponse[] = [],
): CategoryModel {
  return {
    id: String(p.id),
    name: p.title,
    description: p.description,
    short_title: p.short_title || "",
    fileCount: p.total_document,
    files: normalizeCategoryDocuments(docs),
  };
}

export function normalizeCategories(
  categories: DrConbotCategoryResponse[],
): CategoryModel[] {
  return categories ? categories.map((c) => normalizeCategory(c)) : [];
}

export function normalizeFaq(f: DrConbotFaqResponse): FaqModel {
  const statusMap: Record<string, string> = {
    STARTED: "in-review",
    COMPLETED: "approved",
    FAILED: "rejected",
  };
  return {
    id: f.id,
    filename: f.filename,
    description: f.description,
    status: statusMap[f.status] || "Not Specified",
    kind: f.kind,
    createdOn: f.created_on,
    isActive: f.is_active,
    categoryId: f.category_id,
  };
}

export function normalizeFaqs(faqs: DrConbotFaqResponse[]): FaqModel[] {
  return faqs ? faqs.map(normalizeFaq) : [];
}

// Backward compatibility legacy mappings
export const normalizeProductDocument = normalizeCategoryDocument;
export const normalizeProductDocuments = normalizeCategoryDocuments;
export const normalizeProduct = normalizeCategory;
export const normalizeProducts = normalizeCategories;
