import { useState } from "react";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useMasterActivities as useActivities } from "@/services/query/transmitter-ocr/transmitter-ocr.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddActivityDialog } from "../components/activity/add-activity-dialog";

export function ActivityView() {
  const { data: activities = [], isLoading } = useActivities();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <FeaturePageLayout
        title="Activity"
        description={`Monitor and manage ${activities.length} activity records`}
        actions={
          <Button
            className="cursor-pointer"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle />
            Add Activity
          </Button>
        }
      >
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <SharedActivityList
            activities={activities}
            getHref={(activity) =>
              activity.type === "plate"
                ? `/heating-ocr/activity/${activity.id}/plate-groups`
                : `/heating-ocr/activity/${activity.id}/item`
            }
          />
        )}
      </FeaturePageLayout>

      <AddActivityDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
