import { useSearchParams } from "react-router-dom";
import { ActivityChart as SharedActivityChart } from "@/components/shared/usage/activity-chart";
import { useChildActivityUsage } from "@/services/query/transmitter-ocr/child-usage.service";

export function ActivityChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") ?? undefined;
  const month = searchParams.get("month") ?? undefined;

  const { data, isLoading } = useChildActivityUsage(year, month);

  return (
    <SharedActivityChart
      data={data}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
