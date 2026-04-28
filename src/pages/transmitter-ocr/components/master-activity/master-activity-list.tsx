import {
  MasterActivityCard,
  type MasterActivityItem,
} from "./master-activity-card";

interface MasterActivityListProps {
  activities: MasterActivityItem[];
}

export function MasterActivityList({ activities }: MasterActivityListProps) {
  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity) => (
        <MasterActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
