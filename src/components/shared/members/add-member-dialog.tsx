import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "./member-form";
import {
  memberSchema,
  type MemberForm as MemberFormType,
} from "@/pages/sales-enablement-tool/settings/validations/members.schema";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: MemberFormType) => Promise<any>;
  isSaving: boolean;
}

export function AddMemberDialog({
  open,
  onOpenChange,
  onConfirm,
  isSaving,
}: AddMemberDialogProps) {
  const form = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const handleSubmit = (data: MemberFormType) => {
    onConfirm(data);
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
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Add member"
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
