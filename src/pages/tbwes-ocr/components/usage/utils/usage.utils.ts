import { MONTHS } from "@/components/shared/usage/usage-date-filter";
import dayjs from "dayjs";

export function getDateParams(searchParams: URLSearchParams) {
  const year = parseInt(searchParams.get("year") ?? dayjs().year().toString());
  const monthName = searchParams.get("month") ?? dayjs().month().toString();

  const index = MONTHS.indexOf(monthName);
  const monthIndex = index !== -1 ? index + 1 : dayjs().month();

  return { year, monthName, monthIndex };
}

type CostData = {
  day: number[];
  cost: number[];
  total: number;
};

export function mapChartData(costData?: CostData) {
  if (!costData) return [];

  return costData.day.map((day, i) => ({
    label: day,
    value: costData.cost[i] ?? 0,
  }));
}

export function getUsageStats(
  costData?: CostData,
  limitData?: { limit: number },
) {
  if (!costData || !limitData) return undefined;

  const totalSpent = costData.total ?? 0;
  const limit = limitData.limit ?? 0;
  const remaining = Math.max(0, limit - totalSpent);

  return {
    used: totalSpent,
    remaining,
    totalSpent,
    limit,
  };
}
