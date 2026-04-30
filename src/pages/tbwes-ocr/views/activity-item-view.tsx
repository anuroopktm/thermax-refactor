import { useParams } from "react-router-dom";
import { ActivityItemHeader } from "../components/activity-item/activity-item-header";
import { ActivityItemPdfViewer } from "../components/activity-item/activity-item-pdf-viewer";
import { ActivityItemForm } from "../components/activity-item/activity-item-form";
import { useTbwesActivityDetail } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function ActivityItemView() {
  const { id } = useParams<{ id: string }>();
  const { data: activity, isLoading } = useTbwesActivityDetail(id);

  const handleGlobalUnitChange = (unit: string | null) => {
    console.log("Global unit change:", unit);
  };

  const handleSave = () => {
    console.log("Saving item changes");
  };

  const itemName = activity?.title || "Loading...";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ActivityItemHeader
        itemName={itemName}
        onGlobalUnitChange={handleGlobalUnitChange}
        onSave={handleSave}
      />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-[0.65] min-w-0 h-full border-r">
          <ActivityItemPdfViewer />
        </div>

        {/* Form */}
        <div className="flex-[0.35] h-full flex flex-col bg-background">
          <ScrollArea className="flex-1 h-full">
            <div className="p-6 md:p-8">
              {isLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  ))}
                </div>
              ) : (
                // Map activity.data to fields if needed,
                // but for now passing activity.data directly if that's what form expects
                <ActivityItemForm fields={activity?.data} />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
