import { toast } from "sonner";
import { CostChart } from "@/components/shared/usage/cost-chart";
import { TokenUsage } from "@/components/shared/usage/token-usage";
import {
  useHeatingCostUsage,
  useHeatingUsageLimit,
  useHeatingCurrentMember,
  useHeatingUpdateUsageLimit,
} from "@/services/query/heating-ocr";
import { useDateParams } from "../hooks/use-date-params";
import { mapChartData, getUsageStats } from "../utils/usage.utils";

export function CostTab() {
  const { year, monthName, monthIndex } = useDateParams();

  const { data: costData, isLoading: isCostLoading } = useHeatingCostUsage(
    year,
    monthIndex,
  );
  const { data: limitData, isLoading: isLimitLoading } = useHeatingUsageLimit();
  const { data: currentMember } = useHeatingCurrentMember();
  const { mutateAsync, isPending } = useHeatingUpdateUsageLimit();

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
