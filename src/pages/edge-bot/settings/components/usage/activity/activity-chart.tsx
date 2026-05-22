import { useSearchParams } from "react-router-dom";
import { ActivityChart as SharedActivityChart } from "@/components/shared/usage/activity-chart";
import { useActivityData } from "@/services/query/edge-bot/usage.service";
import { getDateParams } from "@/lib/usage-utils";

export function ActivityChart() {
  const [searchParams] = useSearchParams();
  const { year, monthName, monthIndex } = getDateParams(searchParams);

  const { data: dailyData, isLoading } = useActivityData(monthIndex, year);

  return (
    <SharedActivityChart
      data={dailyData || []}
      isLoading={isLoading}
      month={monthName}
      year={year.toString()}
    />
  );
}
