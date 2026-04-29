import { useState } from "react";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useMasterActivities } from "@/services/query/transmitter-ocr/transmitter-ocr.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddMasterActivityDialog } from "../components/master-activity/add-master-activity-dialog";

export function MasterActivityView() {
  const { data: activities = [], isLoading } = useMasterActivities();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <FeaturePageLayout
        title="Master Activity"
        description={`Monitor and manage ${activities.length} master activity records`}
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
          <SharedActivityList activities={activities} />
        )}
      </FeaturePageLayout>

      <AddMasterActivityDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
