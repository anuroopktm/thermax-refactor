import { ChildActivityDetailHeader } from "../components/child-activity-detail/child-activity-detail-header";
import { ChildActivityItemList } from "../components/child-activity-detail/child-activity-item-list";
import { type ChildActivitySubItem } from "../components/child-activity-detail/child-activity-item-card";

const MOCK_SUB_ITEMS: ChildActivitySubItem[] = [
  {
    id: "1",
    name: "12-PG-620sa",
    createdAt: "4/27/2026",
    status: "Failed",
    userInitials: "TA",
  },
  {
    id: "2",
    name: "12-PG-204",
    createdAt: "4/27/2026",
    status: "Passed",
    userInitials: "TA",
  },
  {
    id: "3",
    name: "12-PG-205",
    createdAt: "4/27/2026",
    status: "Passed",
    userInitials: "TA",
  },
  {
    id: "4",
    name: "12-PG-201",
    createdAt: "4/27/2026",
    status: "Passed",
    userInitials: "TA",
  },
];

export function ChildActivityDetailView() {
  const activityTitle = "GAUGES Child 1 Test 27-04";

  return (
    <div className="space-y-6 px-4 py-8 md:px-8">
      <ChildActivityDetailHeader
        title={activityTitle}
        totalResults={MOCK_SUB_ITEMS.length}
      />
      <ChildActivityItemList items={MOCK_SUB_ITEMS} />
    </div>
  );
}
