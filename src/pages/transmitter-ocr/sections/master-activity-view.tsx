import { MasterActivityHeader } from "../components/master-activity/master-activity-header";
import { MasterActivityList } from "../components/master-activity/master-activity-list";
import { type MasterActivityItem } from "../components/master-activity/master-activity-card";

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
    <div className="space-y-6 px-4 py-8 md:px-8">
      <MasterActivityHeader totalResults={MOCK_DATA.length} />
      <MasterActivityList activities={MOCK_DATA} />
    </div>
  );
}
