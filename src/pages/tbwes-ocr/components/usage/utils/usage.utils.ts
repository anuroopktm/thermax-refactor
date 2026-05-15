import { MONTHS } from "@/components/shared/usage/usage-date-filter";
import dayjs from "dayjs";
import {
  type CostUsageModel,
  type LimitModel,
} from "@/services/query/tbwes-ocr/types/usage.types";

export function getDateParams(searchParams: URLSearchParams) {
  const year = parseInt(searchParams.get("year") ?? dayjs().year().toString());
  const monthName = searchParams.get("month") ?? dayjs().month().toString();

  const index = MONTHS.indexOf(monthName);
  const monthIndex = index !== -1 ? index + 1 : dayjs().month();

  return { year, monthName, monthIndex };
}

export function getUsageStats(
  costData?: CostUsageModel[],
  limitData?: LimitModel,
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
