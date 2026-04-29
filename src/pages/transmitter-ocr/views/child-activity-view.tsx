import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useChildActivities } from "@/services/query/transmitter-ocr/transmitter-ocr.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function ChildActivityView() {
  const { data: activities = [], isLoading } = useChildActivities();

  return (
    <FeaturePageLayout
      title="Child Activities"
      description={`Review and process ${activities.length} child activity records`}
      actions={
        <Button className="h-9 cursor-pointer">
          <PlusCircle className="size-4 mr-2" />
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
        <SharedActivityList activities={activities} />
      )}
    </FeaturePageLayout>
  );
}
