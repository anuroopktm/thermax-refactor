import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteMember } from "@/services/query/members/members.service";
import { Loader2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
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
  const { mutate: deleteMember, isPending } = useDeleteMember();

  const handleDelete = () => {
    deleteMember(member.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Member</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove{" "}
            <span className="font-medium">{member.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
