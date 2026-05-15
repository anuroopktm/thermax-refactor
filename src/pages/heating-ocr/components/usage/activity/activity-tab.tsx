import { ActivityChart } from "@/components/shared/usage/activity-chart";
import { UsageStatusCard } from "@/components/shared/usage/usage-status-card";
import {
  useHeatingActivityUsage,
  useHeatingTopUsers,
  useHeatingActivityStats,
} from "@/services/query/heating-ocr";
import { useDateParams } from "../hooks/use-date-params";

export function ActivityTab() {
  const { year, monthName, monthIndex } = useDateParams();

  const { data: chartData = [], isLoading: isActivityLoading } =
    useHeatingActivityUsage(year, monthIndex);
  const { data: mappedTopUsers = [], isLoading: isTopUsersLoading } =
    useHeatingTopUsers(year, monthIndex);
  const { data: mappedStats = [], isLoading: isStatsLoading } =
    useHeatingActivityStats(year, monthIndex);

  return (
    <div className="flex flex-col gap-6">
      <ActivityChart
        data={chartData}
        isLoading={isActivityLoading}
        month={monthName}
        year={year.toString()}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageStatusCard
          title="Top Users Status"
          data={mappedTopUsers}
          isLoading={isTopUsersLoading}
        />
        <UsageStatusCard
          title="HeatingActivityModel Status"
          data={mappedStats}
          isLoading={isStatsLoading}
        />
      </div>
    </div>
  );
}
