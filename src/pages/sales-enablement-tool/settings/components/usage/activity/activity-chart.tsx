import { useSearchParams } from "react-router-dom";
import { SharedActivityChart } from "@/components/shared/usage/activity-chart";
import { useActivityData } from "@/services/query/usage/usage.service";

export function ActivityChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const { data: dailyData, isLoading } = useActivityData(month, year);

  return (
    <SharedActivityChart
      data={dailyData}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
