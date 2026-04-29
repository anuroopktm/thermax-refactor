import { useParams } from "react-router-dom";
import { MasterActivityItemHeader } from "../components/master-activity-item/master-activity-item-header";
import { MasterActivityItemPdfViewer } from "../components/master-activity-item/master-activity-item-pdf-viewer";
import { MasterActivityItemForm } from "../components/master-activity-item/master-activity-item-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MasterActivityItemView() {
  const { id } = useParams<{ id: string }>();

  // Mock data for itemName
  const itemName = id || "Gauges Test 1";

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 md:px-8 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <MasterActivityItemHeader itemName={itemName} />
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-[0.65] min-w-0 h-full border-r">
          <MasterActivityItemPdfViewer />
        </div>

        {/* Form */}
        <div className="flex-[0.35] h-full flex flex-col bg-background">
          <ScrollArea className="flex-1 h-full">
            <div className="p-6 md:p-8">
              <MasterActivityItemForm />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
