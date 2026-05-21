import { getDateParams as getCentralDateParams } from "@/lib/usage-utils";
import {
  type CostUsageModel,
  type UsageLimitModel,
} from "@/services/query/thermax-gpt/types";

export function getDateParams(searchParams: URLSearchParams) {
  const { yearStr, monthName, monthIndex } = getCentralDateParams(searchParams);
  return { year: yearStr, monthName, monthIndex };
}

export function getUsageStats(
  costData?: CostUsageModel[],
  limitData?: UsageLimitModel,
) {
  if (!costData || !limitData) return undefined;

  const totalSpent = costData.reduce((acc, curr) => acc + curr.value, 0);
  const limit = limitData.limit ?? 0;
  const remaining = Math.max(0, limit - totalSpent);

  return {
    used: totalSpent,
    remaining,
    totalSpent,
    limit,
  };
}
