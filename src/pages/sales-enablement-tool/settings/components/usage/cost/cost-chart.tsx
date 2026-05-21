import { useSearchParams } from "react-router-dom";
import { CostChart as SharedCostChart } from "@/components/shared/usage/cost-chart";
import { useCostData } from "@/services/query/sales-enablement/usage.service";
import { getDateParams } from "@/lib/usage-utils";

export function CostChart() {
  const [searchParams] = useSearchParams();
  const { year, monthName, monthIndex } = getDateParams(searchParams);

  const { data: dailyData, isLoading } = useCostData(monthIndex, year);

  return (
    <SharedCostChart
      data={dailyData}
      isLoading={isLoading}
      month={monthName}
      year={year.toString()}
    />
  );
}
