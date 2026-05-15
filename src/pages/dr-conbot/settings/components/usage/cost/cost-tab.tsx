import { toast } from "sonner";
import { CostChart } from "@/components/shared/usage/cost-chart";
import { TokenUsage } from "@/components/shared/usage/token-usage";
import {
  useDrConbotCostUsage,
  useDrConbotUsageLimit,
  useUpdateDrConbotUsageLimit,
} from "@/services/query/dr-conbot/usage.service";
import { useDrConbotMe } from "@/services/query/dr-conbot/members.service";
import { useDateParams } from "../hooks/use-date-params";
import { mapChartData, getUsageStats } from "../utils/usage.utils";
import { useSearchParams } from "react-router-dom";

export function CostTab() {
  const { year, monthName, monthIndex } = useDateParams();
  const [searchParams] = useSearchParams();
  const model = searchParams.get("model") || "All";

  const { data: costData, isLoading: isCostLoading } = useDrConbotCostUsage(
    year,
    monthIndex,
    model,
  );
  const { data: limitData, isLoading: isLimitLoading } =
    useDrConbotUsageLimit();
  const { data: currentMember } = useDrConbotMe();
  const { mutateAsync, isPending } = useUpdateDrConbotUsageLimit();

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
