import { useSearchParams } from "react-router-dom";
import { CostChart as SharedCostChart } from "@/components/shared/usage/cost-chart";
import { useChildCostUsage } from "@/services/query/transmitter-ocr";

export function CostChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const { data: rawData, isLoading } = useChildCostUsage(year);

  const dailyData = rawData?.map((item) => ({
    label: item.period,
    value: item.cost,
  }));

  return (
    <SharedCostChart
      data={dailyData}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
