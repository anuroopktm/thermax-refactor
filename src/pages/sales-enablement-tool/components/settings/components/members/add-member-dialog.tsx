import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "./member-form";
import { useCreateMember } from "@/services/query/members/members.service";
import { type MemberForm as MemberFormType } from "@/validations/members";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberDialog({ open, onOpenChange }: AddMemberDialogProps) {
  const { mutate: createMember, isPending: isSaving } = useCreateMember();

  const handleSubmit = async (data: MemberFormType) => {
    createMember(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
