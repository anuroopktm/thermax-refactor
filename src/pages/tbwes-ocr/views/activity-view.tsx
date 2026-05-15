import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useTbwesActivities } from "@/services/query/tbwes-ocr";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddActivityDialog } from "../components/activity/add-activity-dialog";
import { ActivityFilters } from "../components/activity/activity-filters";
import { mapTbwesQueryFilters } from "../lib/tbwes-mappers";
import { type ActivityModel } from "@/components/shared/ocr/activity-card";

export function ActivityView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const filters = useMemo(
    () => mapTbwesQueryFilters(searchParams),
    [searchParams],
  );

  const { data, isLoading, isFetching } = useTbwesActivities(filters);

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
  activities: ActivityModel[];
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">
          No activities found. Try adjusting your filters or add a new activity.
        </div>
      </div>
    );
  }

  return (
    <SharedActivityList
      activities={activities}
      getHref={(activity) => `/tbwes-ocr/activity/${activity.id}/item`}
    />
  );
}
