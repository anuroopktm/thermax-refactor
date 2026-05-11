import { useState } from "react";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useChildActivities } from "@/services/query/transmitter-ocr";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddChildActivityDialog } from "../components/activity/child/add-child-activity-dialog";

export function ChildActivityView() {
  const { data: activities = [], isLoading } = useChildActivities();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <FeaturePageLayout
        title="Child Activity"
        description={`Review and process ${activities.length} child activity records`}
        actions={
          <Button
            className="cursor-pointer"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle />
            Add Child Activity
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
              `/transmitter-ocr/child-activity/${activity.id}`
            }
          />
        )}
      </FeaturePageLayout>

      <AddChildActivityDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
