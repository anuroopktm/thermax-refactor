import { toast } from "sonner";
import { CostChart } from "@/components/shared/usage/cost-chart";
import { TokenUsage } from "@/components/shared/usage/token-usage";
import {
  useThermaxCostUsage,
  useThermaxUsageLimit,
  useUpdateThermaxUsageLimit,
} from "@/services/query/thermax-gpt/usage.service";
import { useThermaxMe } from "@/services/query/thermax-gpt/members.service";
import { useDateParams } from "../hooks/use-date-params";
import { mapChartData, getUsageStats } from "../utils/usage.utils";
import { useSearchParams } from "react-router-dom";

export function CostTab() {
  const { year, monthName, monthIndex } = useDateParams();
  const [searchParams] = useSearchParams();
  const model = searchParams.get("model") || "All";

  const { data: costData, isLoading: isCostLoading } = useThermaxCostUsage(
    year,
    monthIndex,
    model,
  );
  const { data: limitData, isLoading: isLimitLoading } = useThermaxUsageLimit();
  const { data: currentMember } = useThermaxMe();
  const { mutateAsync, isPending } = useUpdateThermaxUsageLimit();

  const chartData = mapChartData(costData);
  const usageData = getUsageStats(costData, limitData);

  const isOwner = currentMember?.role === "OWNER";
  const isLoading = isCostLoading || isLimitLoading;

  const handleUpdateLimit = async (newLimit: number) => {
    toast.promise(mutateAsync(newLimit), {
      loading: "Updating usage limit...",
      success: "Usage limit updated successfully",
      error: "Failed to update usage limit",
    });
  };

  console.log("monthIndex", monthIndex);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <CostChart
        data={chartData}
        isLoading={isCostLoading}
        month={monthName}
        year={year.toString()}
      />

      <TokenUsage
        data={usageData}
        isLoading={isLoading}
        isUpdating={isPending}
        showEditButton={isOwner}
        onUpdateLimit={handleUpdateLimit}
      />
    </div>
  );
}
