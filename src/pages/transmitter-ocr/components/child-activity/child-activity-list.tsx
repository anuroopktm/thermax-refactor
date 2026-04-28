import {
  ChildActivityCard,
  type ChildActivityItem,
} from "./child-activity-card";

interface ChildActivityListProps {
  activities: ChildActivityItem[];
}

export function ChildActivityList({ activities }: ChildActivityListProps) {
  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity) => (
        <ChildActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
