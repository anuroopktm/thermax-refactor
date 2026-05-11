import { useSearchParams } from "react-router-dom";
import { CostChart as SharedCostChart } from "@/components/shared/usage/cost-chart";
import { useMasterCostUsage } from "@/services/query/transmitter-ocr/master-usage.service";

export function CostChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") ?? undefined;
  const month = searchParams.get("month") ?? undefined;

  const { data, isLoading } = useMasterCostUsage(year, month);

  console.log("datadata", data);

  return (
    <SharedCostChart
      data={data}
      isLoading={isLoading}
      month={month}
      year={year}
    />
  );
}
