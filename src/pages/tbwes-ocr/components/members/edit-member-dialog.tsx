import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "@/components/shared/members/member-form";
import { useTbwesUpdateMember } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { type MemberForm as MemberFormType } from "@/validations/members.schema";
import { toast } from "sonner";

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
  const { mutateAsync: updateMember, isPending } = useTbwesUpdateMember(
    member.id,
  );

  const handleSubmit = async (data: MemberFormType) => {
    toast.promise(updateMember(data), {
      loading: "Updating member...",
      success: () => {
        onOpenChange(false);
        return "Member updated successfully!";
      },
      error: (err) => {
        return (
          err.response?.data?.detail ||
          "Failed to update member. Please try again."
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>Update member permissions.</DialogDescription>
        </DialogHeader>

        <MemberForm
          defaultValues={{
            name: member.name,
            email: member.email,
            role: member.role as any,
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save changes"
          isSaving={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
