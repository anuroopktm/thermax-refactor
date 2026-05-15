import { useSearchParams } from "react-router-dom";
import { CostChart as SharedCostChart } from "@/components/shared/usage/cost-chart";
import { useCostData } from "@/services/query/sales-enablement/usage.service";

export function CostChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const { data: dailyData, isLoading } = useCostData(month, year);

  return (
    <SharedCostChart
      data={dailyData}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
