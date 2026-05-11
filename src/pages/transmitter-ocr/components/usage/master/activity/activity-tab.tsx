import { useSearchParams } from "react-router-dom";
import {
  useMasterTopUsers,
  useMasterActivityStats,
} from "@/services/query/transmitter-ocr/master-usage.service";
import { ActivityChart } from "./activity-chart";
import { UsageStatusCard } from "@/components/shared/usage/usage-status-card";

export function ActivityTab() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") ?? undefined;
  const month = searchParams.get("month") ?? undefined;

  const { data: topUsers, isLoading: isTopUsersLoading } = useMasterTopUsers(
    year,
    month,
  );
  const { data: stats, isLoading: isStatsLoading } = useMasterActivityStats(
    year,
    month,
  );

  return (
    <div className="flex flex-col gap-6">
      <ActivityChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageStatusCard
          title="Top Master Users Status"
          data={topUsers}
          isLoading={isTopUsersLoading}
        />
        <UsageStatusCard
          title="Master Activity Status"
          data={stats}
          isLoading={isStatsLoading}
        />
      </div>
    </div>
  );
}
