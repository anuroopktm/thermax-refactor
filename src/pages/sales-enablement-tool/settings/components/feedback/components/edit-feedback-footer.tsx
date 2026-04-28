import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface EditFeedbackFooterProps {
  activeTab: string;
  onNext: () => void;
  onCancel: () => void;
}

export function EditFeedbackFooter({
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
        <Button
          type="submit"
          form="edit-feedback-form"
          className="cursor-pointer"
        >
          Save changes
        </Button>
      )}
    </DialogFooter>
  );
}
