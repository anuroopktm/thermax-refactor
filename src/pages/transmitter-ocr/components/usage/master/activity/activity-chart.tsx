import { useSearchParams } from "react-router-dom";
import { ActivityChart as SharedActivityChart } from "@/components/shared/usage/activity-chart";
import { useMasterDetailedActivity } from "@/services/query/transmitter-ocr";
import dayjs from "dayjs";

export function ActivityChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const { data: detailedActivity, isLoading } = useMasterDetailedActivity(
    year,
    month,
  );

  // Map detailed activity to daily counts
  const dailyCounts: Record<string, number> = {};
  detailedActivity?.forEach((item) => {
    const day = dayjs(item.created_on).format("ddd");
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const mappedData = days.map((day) => ({
    label: day,
    value: dailyCounts[day] || 0,
  }));

  return (
    <SharedActivityChart
      data={mappedData}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
