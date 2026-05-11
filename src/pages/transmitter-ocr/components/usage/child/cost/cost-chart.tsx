import { useSearchParams } from "react-router-dom";
import { CostChart as SharedCostChart } from "@/components/shared/usage/cost-chart";
import { useChildCostUsage } from "@/services/query/transmitter-ocr/child-usage.service";

export function CostChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const { data, isLoading } = useChildCostUsage(year, month);

  return (
    <SharedCostChart
      data={data}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
