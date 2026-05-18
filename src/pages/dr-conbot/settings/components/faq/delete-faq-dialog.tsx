import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { FaqModel } from "@/services/query/dr-conbot/types";

interface DeleteFaqDialogProps {
  faq: FaqModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<any>;
  isDeleting: boolean;
}

export function DeleteFaqDialog({
  faq,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteFaqDialogProps) {
  const handleDelete = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete FAQ Document</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove the
            document <span className="font-medium">{faq.filename}</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
