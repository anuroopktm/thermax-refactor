import { ActivityChart } from "@/components/shared/usage/activity-chart";
import {
  useDrConbotActivityUsage,
  useDrConbotTopUsers,
} from "@/services/query/dr-conbot/usage.service";
import { useDateParams } from "../hooks/use-date-params";
import { TopUsersList } from "./top-users-list";
import { useSearchParams } from "react-router-dom";

export function ActivityTab() {
  const { year, monthName, monthIndex } = useDateParams();
  const [searchParams] = useSearchParams();
  const model = searchParams.get("model") || "All";

  const { data: chartData = [], isLoading: isActivityLoading } =
    useDrConbotActivityUsage(year, monthIndex, model);
  const { data: mappedTopUsers = [], isLoading: isTopUsersLoading } =
    useDrConbotTopUsers(year, monthIndex, model);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div className="col-span-2">
        <ActivityChart
          data={chartData}
          isLoading={isActivityLoading}
          month={monthName}
          year={year.toString()}
        />
      </div>
      <TopUsersList
        title="Top Users Status"
        data={mappedTopUsers}
        isLoading={isTopUsersLoading}
      />
    </div>
  );
}
