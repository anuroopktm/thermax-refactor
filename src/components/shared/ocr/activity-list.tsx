import { SharedActivityCard } from "./activity-card";

interface ActivityItem {
  id: string;
  title: string;
  createdAt: string;
  status: string;
  userInitials: string;
}

interface SharedActivityListProps {
  activities: ActivityItem[];
  getHref?: (id: string) => string;
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
          href={getHref?.(activity.id) || activity.id}
          hideActions={hideActions}
          hideStatus={hideStatus}
        />
      ))}
    </div>
  );
}
