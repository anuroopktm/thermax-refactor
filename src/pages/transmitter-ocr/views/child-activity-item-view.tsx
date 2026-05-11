import { useParams } from "react-router-dom";
import { ChildActivityItemHeader } from "../components/activity-item/child/child-activity-item-header";
import { ChildActivityItemPdfViewer } from "../components/activity-item/child/child-activity-item-pdf-viewer";
import { ChildActivityItemForm } from "../components/activity-item/child/child-activity-item-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivityItemDetail } from "@/services/query/transmitter-ocr/child-activities.service";
import { Skeleton } from "@/components/ui/skeleton";

export function ChildActivityItemView() {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: item, isLoading } = useActivityItemDetail(itemId);

  const itemName = item?.title || "Loading...";

  return (
    <div className="flex flex-col h-full">
      <ChildActivityItemHeader itemName={itemName} />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-[0.65] min-w-0 h-full border-r">
          <ChildActivityItemPdfViewer />
        </div>

        {/* Form */}
        <div className="flex-[0.35] h-full flex flex-col bg-background">
          <ScrollArea className="flex-1 h-full">
            <div className="p-6 md:p-8">
              {isLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <ChildActivityItemForm fields={item?.fields} />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
