import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useMasterActivities } from "@/services/query/transmitter-ocr/master-activities.service";

export function ActivitySummaryMasterView() {
  const { data: activities = [], isLoading } = useMasterActivities();

  return (
    <FeaturePageLayout
      title="Activity Summary"
      description="Choose a master activity to view its child activities and summary"
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
            `/transmitter-ocr/activity-summary/${activity.id}`
          }
          hideActions
          hideStatus
        />
      )}
    </FeaturePageLayout>
  );
}
