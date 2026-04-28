import { MasterActivityHeader } from "../components/master-activity/master-activity-header";
import {
  MasterActivityCard,
  type MasterActivityItem,
} from "../components/master-activity/master-activity-card";

const MOCK_DATA: MasterActivityItem[] = [
  {
    id: "1",
    title: "Gauges Test 1 27-04-26",
    createdAt: "4/27/2026",
    status: "In Progress",
    userInitials: "TA",
  },
  {
    id: "2",
    title: "Gauges Test 1 27-04-26 Dummy",
    createdAt: "4/27/2026",
    status: "In Progress",
    userInitials: "TA",
  },
  {
    id: "3",
    title: "Emerson Test 1 27-04-26",
    createdAt: "4/27/2026",
    status: "In Progress",
    userInitials: "TA",
  },
];

export function MasterActivityView() {
  return (
    <div className="space-y-6">
      <MasterActivityHeader totalResults={MOCK_DATA.length} />
      <div className="flex flex-col gap-3">
        {MOCK_DATA.map((activity) => (
          <MasterActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
