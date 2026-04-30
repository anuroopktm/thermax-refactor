import { useSearchParams } from "react-router-dom";
import { CostChart } from "@/components/shared/usage/cost-chart";
import { TokenUsage } from "@/components/shared/usage/token-usage";
import { useTbwesCostUsage } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { MONTHS } from "@/components/shared/usage/usage-date-filter";

export function CostTab() {
  const [searchParams] = useSearchParams();
  const year = parseInt(searchParams.get("year") || "2026");
  const monthName = searchParams.get("month") || "April";
  const monthIndex =
    MONTHS.indexOf(monthName) !== -1 ? MONTHS.indexOf(monthName) + 1 : 4;

  const { data: costData, isLoading } = useTbwesCostUsage(year, monthIndex);

  // Map API data to chart format
  const chartData =
    costData?.day.map((d, i) => ({
      day: d,
      cost: costData.cost[i],
    })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <CostChart
        data={chartData}
        isLoading={isLoading}
        month={monthName}
        year={year.toString()}
      />
      <TokenUsage />
    </div>
  );
}
