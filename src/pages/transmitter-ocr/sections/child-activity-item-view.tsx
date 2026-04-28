import { useParams } from "react-router-dom";
import { ChildActivityItemHeader } from "../components/child-activity-item/child-activity-item-header";
import { ChildActivityItemPdfViewer } from "../components/child-activity-item/child-activity-item-pdf-viewer";
import { ChildActivityItemForm } from "../components/child-activity-item/child-activity-item-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChildActivityItemView() {
  const { itemId } = useParams<{ itemId: string }>();

  // Mock data for itemName
  const itemName = itemId || "12-PG-620sa";

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 md:px-8 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <ChildActivityItemHeader itemName={itemName} />
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-[0.65] min-w-0 h-full border-r">
          <ChildActivityItemPdfViewer />
        </div>

        {/* Form */}
        <div className="flex-[0.35] h-full flex flex-col bg-background">
          <ScrollArea className="flex-1 h-full">
            <div className="p-6 md:p-8">
              <ChildActivityItemForm />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
