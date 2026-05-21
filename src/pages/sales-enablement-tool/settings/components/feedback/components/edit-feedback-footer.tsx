import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface EditFeedbackFooterProps {
  formId: string;
  activeTab: string;
  onNext: () => void;
  onCancel: () => void;
}

export function EditFeedbackFooter({
  formId,
  activeTab,
  onNext,
  onCancel,
}: EditFeedbackFooterProps) {
  return (
    <DialogFooter>
      <Button
        type="button"
        variant="ghost"
        className="cursor-pointer"
        onClick={onCancel}
      >
        Cancel
      </Button>
      {activeTab === "feedback" && (
        <Button type="button" className="cursor-pointer" onClick={onNext}>
          Next
        </Button>
      )}
      {activeTab === "review" && (
        <Button type="submit" form={formId} className="cursor-pointer">
          Save changes
        </Button>
      )}
    </DialogFooter>
  );
}
