import { SharedActivityCard, type ActivityItem } from "./activity-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileSearch } from "lucide-react";

interface SharedActivityListProps {
  activities: ActivityItem[];
  getHref?: (activity: ActivityItem) => string;
  hideActions?: boolean;
  hideStatus?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function SharedActivityList({
  activities,
  getHref,
  hideActions,
  hideStatus,
  emptyTitle = "No Activities Found",
  emptyDescription = "Try adjusting your filters or add a new activity to get started.",
}: SharedActivityListProps) {
  if (activities.length === 0) {
    return (
      <Empty className="min-h-[400px]">
        <EmptyHeader>
          <EmptyMedia>
            <FileSearch className="size-8 text-primary" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">{emptyTitle}</EmptyTitle>
          <EmptyDescription className="text-xs/relaxed">
            {emptyDescription}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

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
