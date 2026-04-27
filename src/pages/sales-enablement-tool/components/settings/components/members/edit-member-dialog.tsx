import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "./member-form";
import { type MemberForm as MemberFormType } from "@/validations/member";

interface Member {
  name: string;
  email: string;
  role: string;
}

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: (data: MemberFormType) => void;
}

export function EditMemberDialog({
  member,
  open,
  onOpenChange,
  onUpdate,
}: EditMemberDialogProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: MemberFormType) => {
    try {
      setIsSaving(true);
      // simulate API
      await new Promise((res) => setTimeout(res, 800));
      onUpdate?.(data);
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
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
