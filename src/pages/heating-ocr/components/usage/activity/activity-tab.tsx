import { useTopUsers } from "@/services/query/usage/usage.service";
import { ActivityChart } from "@/components/shared/usage/activity-chart";
import { UsageStatusCard } from "@/components/shared/usage/usage-status-card";

export function ActivityTab() {
  const { data: topUsers, isLoading: isTopUsersLoading } = useTopUsers();

  const topUsersData =
    topUsers?.map((user) => ({
      name: user.name,
      value: user.value,
    })) || [];

  const activityStatusData = [
    { name: "In Progress", value: 3 },
    { name: "Completed", value: 12 },
    { name: "Pending", value: 5 },
    { name: "On Hold", value: 2 },
    { name: "Cancelled", value: 1 },
    { name: "In Review", value: 4 },
    { name: "Draft", value: 7 },
    { name: "Deleted", value: 0 },
    { name: "Archived", value: 10 },
    { name: "Flagged", value: 3 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <ActivityChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageStatusCard
          title="Top Users Status"
          data={topUsersData}
          isLoading={isTopUsersLoading}
        />
        <UsageStatusCard title="Activity Status" data={activityStatusData} />
      </div>
    </div>
  );
}
