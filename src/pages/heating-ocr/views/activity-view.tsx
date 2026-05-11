import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useHeatingActivities } from "@/services/query/heating-ocr";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileSearch, PlusCircle } from "lucide-react";
import { AddActivityDialog } from "../components/activity/add-activity-dialog";
import { ActivityFilters } from "../components/activity/activity-filters";
import {
  mapHeatingQueryFilters,
  type HeatingActivityItem,
} from "../lib/heating-mappers";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ActivityView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const filters = useMemo(
    () => mapHeatingQueryFilters(searchParams),
    [searchParams],
  );

  const { data, isLoading, isFetching } = useHeatingActivities(filters);

  const activities = data?.result ?? [];
  const total = data?.total ?? 0;

  const isEmpty = !isLoading && activities.length === 0;

  return (
    <>
      <FeaturePageLayout
        title="Activity"
        description={`Monitor and manage ${total} activity records`}
        actions={
          <div className="flex items-center gap-3">
            <ActivityFilters />

            <Button
              className="h-9 cursor-pointer"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusCircle />
              Add Activity
            </Button>
          </div>
        }
      >
        <ActivityContent
          isLoading={isLoading || isFetching}
          isEmpty={isEmpty}
          activities={activities}
        />
      </FeaturePageLayout>

      <AddActivityDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}

/* ---------------- Content Renderer ---------------- */

function ActivityContent({
  isLoading,
  isEmpty,
  activities,
}: {
  isLoading: boolean;
  isEmpty: boolean;
  activities: HeatingActivityItem[];
}) {
  if (isLoading) return <ActivitySkeleton />;
  if (isEmpty) return <ActivityEmpty />;

  return (
    <SharedActivityList
      activities={activities}
      getHref={(activity) =>
        activity.template === "Plate"
          ? `/heating-ocr/activity/${activity.id}/plate-groups`
          : `/heating-ocr/activity/${activity.id}/item`
      }
    />
  );
}

/* ---------------- Empty State ---------------- */

function ActivityEmpty() {
  return (
    <Empty className="py-20">
      <EmptyHeader>
        <EmptyMedia>
          <FileSearch className="size-8 text-primary" />
        </EmptyMedia>
        <EmptyTitle className="text-xl">No Activities Found</EmptyTitle>
        <EmptyDescription className="text-xs/relaxed">
          Try adjusting your filters or add a new activity to get started.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

/* ---------------- Skeleton ---------------- */

function ActivitySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  );
}
