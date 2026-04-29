import { useParams, useNavigate } from "react-router-dom";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { SharedActivityList } from "@/components/shared/ocr/activity-list";
import { useChildActivities } from "@/services/query/transmitter-ocr/transmitter-ocr.service";
import { Skeleton } from "@/components/ui/skeleton";

export function ActivitySummaryChildView() {
  const navigate = useNavigate();
  const { masterId } = useParams<{ masterId: string }>();
  const { data: activities = [], isLoading } = useChildActivities(masterId);

  return (
    <FeaturePageLayout
      title={`Activity Summary / #${masterId}`}
      description={`Viewing child activities for Master Activity #${masterId}`}
      onBack={() => navigate("/transmitter-ocr/activity-summary")}
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
          getHref={(id) =>
            `/transmitter-ocr/activity-summary/${masterId}/${id}`
          }
          hideActions
        />
      )}
    </FeaturePageLayout>
  );
}
