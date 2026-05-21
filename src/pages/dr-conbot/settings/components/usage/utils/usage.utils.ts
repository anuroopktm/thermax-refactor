import { getDateParams as getCentralDateParams } from "@/lib/usage-utils";
import {
  type CostUsageModel,
  type UsageLimitModel,
} from "@/services/query/dr-conbot/types";

export function getDateParams(searchParams: URLSearchParams) {
  const { yearStr, monthName, monthIndex } = getCentralDateParams(searchParams);
  return { year: yearStr, monthName, monthIndex };
}

export function getUsageStats(
  costData?: CostUsageModel[],
  limitData?: UsageLimitModel,
) {
  if (!costData || !limitData) return undefined;

  // For Dr-Conbot, we might need the total totalSpent which was in the raw Response
  // but we can calculate it from the Model if we don't have it.
  // However, it's better if the Mapper returns the total too if needed.
  // Actually, let's just use the raw response for stats if needed, or update the model.

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
