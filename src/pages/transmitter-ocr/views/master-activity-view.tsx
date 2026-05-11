import { useState } from "react";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useMasterActivities } from "@/services/query/transmitter-ocr";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddMasterActivityDialog } from "../components/activity/master/add-master-activity-dialog";
import { EditMasterActivityDialog } from "../components/activity/master/edit-master-activity-dialog";
import { DeleteMasterActivityDialog } from "../components/activity/master/delete-master-activity-dialog";
import type { MasterActivityItem } from "@/services/query/transmitter-ocr/types";
import type { ActivityItem } from "@/components/shared/ocr/activity-card";

export function MasterActivityView() {
  const { data: activities = [], isLoading } = useMasterActivities();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<MasterActivityItem | null>(null);

  const handleAdd = () => {
    setSelectedActivity(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (activity: ActivityItem) => {
    setSelectedActivity(activity as unknown as MasterActivityItem);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (activity: ActivityItem) => {
    setSelectedActivity(activity as unknown as MasterActivityItem);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <FeaturePageLayout
        title="Master Activity"
        description={`Monitor and manage ${activities.length} master activity records`}
        actions={
          <Button className="cursor-pointer" onClick={handleAdd}>
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
              `/transmitter-ocr/master-activity/${activity.id}`
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </FeaturePageLayout>

      <AddMasterActivityDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      {selectedActivity && (
        <EditMasterActivityDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          activity={selectedActivity}
        />
      )}

      <DeleteMasterActivityDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        activity={selectedActivity}
      />
    </>
  );
}
