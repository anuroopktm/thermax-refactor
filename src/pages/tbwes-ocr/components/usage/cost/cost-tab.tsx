import { toast } from "sonner";
import { CostChart } from "@/components/shared/usage/cost-chart";
import { TokenUsage } from "@/components/shared/usage/token-usage";
import {
  useTbwesCostUsage,
  useTbwesUsageLimit,
  useTbwesCurrentMember,
  useTbwesUpdateUsageLimit,
} from "@/services/query/tbwes-ocr";
import { useDateParams } from "../hooks/use-date-params";
import { mapChartData, getUsageStats } from "../utils/usage.utils";

export function CostTab() {
  const { year, monthName, monthIndex } = useDateParams();

  const { data: costData, isLoading: isCostLoading } = useTbwesCostUsage(
    year,
    monthIndex,
  );
  const { data: limitData, isLoading: isLimitLoading } = useTbwesUsageLimit();
  const { data: currentMember } = useTbwesCurrentMember();
  const { mutateAsync, isPending } = useTbwesUpdateUsageLimit();

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
