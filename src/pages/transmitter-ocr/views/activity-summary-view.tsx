import { ActivitySummaryHeader } from "../components/activity-summary/activity-summary-header";
import { ActivitySummaryTable } from "../components/activity-summary/activity-summary-table";
import { useActivitySummary } from "@/services/query/transmitter-ocr/transmitter-ocr.service";

export function ActivitySummaryView() {
  const { data: items = [], isLoading } = useActivitySummary();

  return (
    <div className="space-y-6 px-4 py-8 md:px-8">
      <ActivitySummaryHeader />
      <ActivitySummaryTable items={items} isLoading={isLoading} />
    </div>
  );
}
