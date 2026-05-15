import { useSearchParams } from "react-router-dom";
import { ActivityChart as SharedActivityChart } from "@/components/shared/usage/activity-chart";
import { useActivityData } from "@/services/query/sales-enablement/usage.service";
import dayjs from "dayjs";

export function ActivityChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || dayjs().year().toString();
  const month = searchParams.get("month") || dayjs().month().toString();

  const { data: dailyData, isLoading } = useActivityData(month, year);

  return (
    <SharedActivityChart
      data={dailyData || []}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
