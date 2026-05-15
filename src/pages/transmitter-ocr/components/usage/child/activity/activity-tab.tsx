import { useSearchParams } from "react-router-dom";
import {
  useChildTopUsers,
  useChildActivityStats,
} from "@/services/query/transmitter-ocr/child-usage.service";
import { ActivityChart } from "./activity-chart";
import { UsageStatusCard } from "@/components/shared/usage/usage-status-card";

export function ActivityTab() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const { data: topUsers, isLoading: isTopUsersLoading } = useChildTopUsers(
    year,
    month,
  );
  const { data: stats, isLoading: isStatsLoading } = useChildActivityStats(
    year,
    month,
  );

  return (
    <div className="flex flex-col gap-6">
      <ActivityChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageStatusCard
          title="Top Child Users Status"
          data={topUsers || []}
          isLoading={isTopUsersLoading}
        />
        <UsageStatusCard
          title="Child Activity Status"
          data={stats || []}
          isLoading={isStatsLoading}
        />
      </div>
    </div>
  );
}
