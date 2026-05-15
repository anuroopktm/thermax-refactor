import { useEffect } from "react";
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
} from "@/lib/validations/members.schema";
import type { Member } from "@/services/query/shared/types/members.types";

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: MemberFormType) => Promise<any>;
  isSaving: boolean;
}

export function EditMemberDialog({
  member,
  open,
  onOpenChange,
  onConfirm,
  isSaving,
}: EditMemberDialogProps) {
  const form = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: member.name,
      email: member.email,
      role: member.role.toUpperCase() as any,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: member.name,
        email: member.email,
        role: member.role.toUpperCase() as any,
      });
    }
  }, [member, open, form]);

  const handleSubmit = (data: MemberFormType) => {
    onConfirm(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>Update member details and role.</DialogDescription>
        </DialogHeader>

        <MemberForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
