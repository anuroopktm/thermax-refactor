import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "@/components/shared/members/member-form";
import { useTbwesCreateMember } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { type MemberForm as MemberFormType } from "@/validations/members.schema";
import { toast } from "sonner";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberDialog({ open, onOpenChange }: AddMemberDialogProps) {
  const { mutateAsync: createMember, isPending } = useTbwesCreateMember();

  const handleSubmit = async (data: MemberFormType) => {
    toast.promise(createMember(data), {
      loading: "Adding member...",
      success: () => {
        onOpenChange(false);
        return "Member added successfully!";
      },
      error: (err) => {
        return (
          err.response?.data?.detail ||
          "Failed to add member. Please try again."
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Invite a new member to your team.
          </DialogDescription>
        </DialogHeader>

        <MemberForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Add member"
          isSaving={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
