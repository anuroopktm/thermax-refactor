import { SharedActivityCard, type ActivityItem } from "./activity-card";

interface SharedActivityListProps {
  activities: ActivityItem[];
  getHref?: (activity: ActivityItem) => string;
  hideActions?: boolean;
  hideStatus?: boolean;
}

export function SharedActivityList({
  activities,
  getHref,
  hideActions,
  hideStatus,
}: SharedActivityListProps) {
  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity) => (
        <SharedActivityCard
          key={activity.id}
          activity={activity}
          href={getHref?.(activity) || activity.id}
          hideActions={hideActions}
          hideStatus={hideStatus}
        />
      ))}
    </div>
  );
}
