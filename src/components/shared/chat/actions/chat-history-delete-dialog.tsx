import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ChatHistoryClearDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export function ChatHistoryClearDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: ChatHistoryClearDialogProps) {
  const handleConfirm = async () => {
    if (isLoading) return;

    await onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear all conversations?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All your chat history will be
            permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            size="sm"
            className="cursor-pointer"
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size="sm"
            className="cursor-pointer"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
