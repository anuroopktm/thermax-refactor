import { ChildActivityHeader } from "../components/child-activity/child-activity-header";
import { ChildActivityList } from "../components/child-activity/child-activity-list";
import { type ChildActivityItem } from "../components/child-activity/child-activity-card";

const MOCK_DATA: ChildActivityItem[] = [
  {
    id: "1",
    title: "Child Activity Test 1",
    createdAt: "4/28/2026",
    status: "In Progress",
    userInitials: "TA",
  },
  {
    id: "2",
    title: "Child Activity Test 2",
    createdAt: "4/28/2026",
    status: "In Progress",
    userInitials: "TA",
  },
];

export function ChildActivityView() {
  return (
    <div className="space-y-6 px-4 py-8 md:px-8">
      <ChildActivityHeader totalResults={MOCK_DATA.length} />
      <ChildActivityList activities={MOCK_DATA} />
    </div>
  );
}
