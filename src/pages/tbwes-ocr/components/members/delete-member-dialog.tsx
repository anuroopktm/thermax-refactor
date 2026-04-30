import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTbwesDeleteMember } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  email: string;
}

interface DeleteMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteMemberDialog({
  member,
  open,
  onOpenChange,
}: DeleteMemberDialogProps) {
  const { mutateAsync: deleteMember, isPending } = useTbwesDeleteMember();

  const handleDelete = async () => {
    toast.promise(deleteMember(member.id), {
      loading: "Removing member...",
      success: () => {
        onOpenChange(false);
        return "Member removed successfully!";
      },
      error: (err) => {
        return (
          err.response?.data?.detail ||
          "Failed to remove member. Please try again."
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-medium text-foreground">{member.name}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="cursor-pointer"
          >
            Remove Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
