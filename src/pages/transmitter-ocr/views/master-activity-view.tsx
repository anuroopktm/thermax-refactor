import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useMasterActivities } from "@/services/query/transmitter-ocr/transmitter-ocr.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function MasterActivityView() {
  const { data: activities = [], isLoading } = useMasterActivities();

  return (
    <FeaturePageLayout
      title="Master Activities"
      description={`Monitor and manage ${activities.length} master activity records`}
      actions={
        <Button className="h-9 cursor-pointer">
          <PlusCircle className="size-4 mr-2" />
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
  );
}
