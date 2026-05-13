import { ActivityChart } from "./activity-chart";
import { TopUsersList } from "./top-users-list";

export function ActivityTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <ActivityChart />
      <TopUsersList />
    </div>
  );
}
