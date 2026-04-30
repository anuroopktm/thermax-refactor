import { useState } from "react";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useTbwesActivities } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddActivityDialog } from "../components/activity/add-activity-dialog";

export function ActivityView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data, isLoading, isFetching } = useTbwesActivities();

  return (
    <>
      <FeaturePageLayout
        title="Activity"
        description={`Monitor and manage ${data?.total || 0} activity records`}
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
        {isLoading || isFetching ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <SharedActivityList
            activities={data?.result || []}
            getHref={(activity) => `/tbwes-ocr/activity/${activity.id}/item`}
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
