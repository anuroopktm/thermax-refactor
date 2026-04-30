import { useSearchParams } from "react-router-dom";
import { ActivityChart } from "@/components/shared/usage/activity-chart";
import { UsageStatusCard } from "@/components/shared/usage/usage-status-card";
import {
  useTbwesActivityUsage,
  useTbwesTopUsers,
  useTbwesActivityStats,
} from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { MONTHS } from "@/components/shared/usage/usage-date-filter";

export function ActivityTab() {
  const [searchParams] = useSearchParams();
  const year = parseInt(searchParams.get("year") || "2026");
  const monthName = searchParams.get("month") || "April";
  const monthIndex =
    MONTHS.indexOf(monthName) !== -1 ? MONTHS.indexOf(monthName) + 1 : 4;

  const { data: activityData, isLoading: isActivityLoading } =
    useTbwesActivityUsage(year, monthIndex);
  const { data: topUsersData, isLoading: isTopUsersLoading } = useTbwesTopUsers(
    year,
    monthIndex,
  );
  const { data: statsData, isLoading: isStatsLoading } = useTbwesActivityStats(
    year,
    monthIndex,
  );

  // Map Activity Usage Data
  const chartData =
    activityData?.day.map((d, i) => ({
      day: d,
      activity: activityData.activity[i],
    })) || [];

  // Map Top Users
  const mappedTopUsers =
    topUsersData?.result.map((user) => ({
      name: user.name,
      value: user.activity,
    })) || [];

  // Map Activity Stats
  const mappedStats =
    statsData?.result.map((stat) => ({
      name: stat.stat,
      value: stat.activity_count,
    })) || [];

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
          title="Activity Status"
          data={mappedStats}
          isLoading={isStatsLoading}
        />
      </div>
    </div>
  );
}
