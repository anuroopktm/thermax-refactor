import {
  type CostItemResponse,
  type CostModel,
  type ActivityItemResponse,
  type ActivityModel,
  type Member as SalesMember,
} from "@/services/query/sales-enablement/types";
import { type Member } from "@/services/query/shared/types";
import {
  type TopUserResponse,
  type TopUserModel,
} from "@/services/query/sales-enablement/types";

/**
 * Maps Cost usage data from API to UI model
 */
export const mapCostData = (data: CostItemResponse[]): CostModel[] => {
  return (
    data?.map((item) => ({
      label: String(item.label),
      value: item.value,
    })) || []
  );
};

/**
 * Maps Activity usage data from API to UI model
 */
export const mapActivityData = (
  data: ActivityItemResponse[],
): ActivityModel[] => {
  return (
    data?.map((item) => ({
      label: String(item.label),
      value: item.questions,
    })) || []
  );
};

/**
 * Maps raw API Member to UI model
 */
export function normalizeSalesMember(m: SalesMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
  };
}

export function normalizeSalesMembers(members: SalesMember[]): Member[] {
  return members.map(normalizeSalesMember);
}

/**
 * Maps Top User data from API to UI model
 */
export const mapTopUsersData = (data: TopUserResponse[]): TopUserModel[] => {
  return (
    data?.map((item) => ({
      name: item.name,
      email: item.email,
      initial: item.initial,
      value: item.value,
    })) || []
  );
};
