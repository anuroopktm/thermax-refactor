import { type Member } from "@/services/query/shared/types";
import {
  type DrConbotMember,
  type CreateDrConbotMemberPayload,
  type UpdateDrConbotMemberPayload,
  type DrConbotProductResponse,
  type ProductModel,
  type DrConbotProductDocumentResponse,
  type ProductFileModel,
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

export function normalizeProductDocument(
  doc: DrConbotProductDocumentResponse,
): ProductFileModel {
  return {
    id: String(doc.id),
    name: doc.filename,
    type: doc.filename.split(".").pop() || "",
    status: doc.status,
    description: doc.description || "",
    kind: doc.kind,
  };
}

export function normalizeProductDocuments(
  docs: DrConbotProductDocumentResponse[],
): ProductFileModel[] {
  return docs ? docs.map(normalizeProductDocument) : [];
}

export function normalizeProduct(
  p: DrConbotProductResponse,
  docs: DrConbotProductDocumentResponse[] = [],
): ProductModel {
  return {
    id: String(p.id),
    name: p.title,
    description: p.description,
    models: p.short_title || "",
    fileCount: p.total_document,
    files: normalizeProductDocuments(docs),
  };
}

export function normalizeProducts(
  products: DrConbotProductResponse[],
): ProductModel[] {
  return products ? products.map((p) => normalizeProduct(p)) : [];
}

export function normalizeFaq(f: DrConbotFaqResponse): FaqModel {
  const statusMap: Record<string, string> = {
    STARTED: "in-review",
    COMPLETED: "approved",
    FAILED: "rejected",
  };
  return {
    id: f.id,
    user: "AD",
    question: f.description || f.filename,
    answer: f.filename,
    status: statusMap[f.status] || "Not Specified",
    source: f.kind,
    filename: f.filename,
    kind: f.kind,
    createdOn: f.created_on,
  };
}

export function normalizeFaqs(faqs: DrConbotFaqResponse[]): FaqModel[] {
  return faqs ? faqs.map(normalizeFaq) : [];
}
