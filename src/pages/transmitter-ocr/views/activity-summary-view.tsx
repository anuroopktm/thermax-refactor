import { useParams } from "react-router-dom";
import { ActivitySummaryHeader } from "../components/activity-summary/activity-summary-header";
import { ActivitySummaryTable } from "../components/activity-summary/activity-summary-table";
import { useActivitySummary } from "@/services/query/transmitter-ocr/transmitter-ocr.service";

export function ActivitySummaryView() {
  const { childId } = useParams<{ masterId: string; childId: string }>();
  const { data: items = [], isLoading } = useActivitySummary(childId);

  return (
    <div className="space-y-6 px-4 py-8 md:px-8">
      <ActivitySummaryHeader />
      <ActivitySummaryTable items={items} isLoading={isLoading} />
    </div>
  );
}
