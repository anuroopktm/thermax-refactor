import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "./member-form";
import { type MemberForm as MemberFormType } from "@/validations/members.schema";
import { useUpdateMember } from "@/services/query/members/members.service";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMemberDialog({
  member,
  open,
  onOpenChange,
}: EditMemberDialogProps) {
  const { mutate: updateMember, isPending: isSaving } = useUpdateMember(
    member.id,
  );

  const handleSubmit = async (data: MemberFormType) => {
    updateMember(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>Update member details and role.</DialogDescription>
        </DialogHeader>

        <MemberForm
          defaultValues={{
            name: member.name,
            email: member.email,
            role: member.role.toLowerCase() as MemberFormType["role"],
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
