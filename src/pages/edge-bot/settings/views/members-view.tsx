import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { AddMemberDialog } from "@/components/shared/members/add-member-dialog";
import { DeleteMemberDialog } from "@/components/shared/members/delete-member-dialog";
import { EditMemberDialog } from "@/components/shared/members/edit-member-dialog";
import { MembersTable } from "@/components/shared/members/members-table";
import { Button } from "@/components/ui/button";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  useCreateMember,
  useDeleteMember,
  useMembers,
  useUpdateMember,
} from "@/services/query/edge-bot/members.service";
import { type Member } from "@/services/query/shared/types";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const { data: members = [], isLoading } = useMembers();

  const createMutation = useCreateMember();
  const updateMutation = useUpdateMember(editingMember?.id || "");
  const deleteMutation = useDeleteMember();

  const handleCreate = async (data: MemberForm) => {
    toast.promise(createMutation.mutateAsync(data), {
      loading: "Adding member...",
      success: () => {
        setIsAddDialogOpen(false);
        return "Member added successfully!";
      },
      error: (err: unknown) =>
        (err as AxiosError<{ detail?: string }>).response?.data?.detail ||
        "Failed to add member.",
    });
  };

  const handleUpdate = async (data: MemberForm) => {
    toast.promise(updateMutation.mutateAsync(data), {
      loading: "Updating member...",
      success: () => {
        setEditingMember(null);
        return "Member updated successfully!";
      },
      error: (err: unknown) =>
        (err as AxiosError<{ detail?: string }>).response?.data?.detail ||
        "Failed to update member.",
    });
  };

  const handleDelete = async () => {
    if (deletingMember) {
      toast.promise(deleteMutation.mutateAsync(deletingMember.id), {
        loading: "Deleting member...",
        success: () => {
          setDeletingMember(null);
          return "Member deleted successfully!";
        },
        error: (err: unknown) =>
          (err as AxiosError<{ detail?: string }>).response?.data?.detail ||
          "Failed to delete member.",
      });
    }
  };

  return (
    <FeaturePageLayout
      className="p-0!"
      title="Members"
      description={
        isLoading
          ? "Loading members..."
          : `Showing ${members?.length ?? 0} members`
      }
      actions={
        <Button
          className="h-9 cursor-pointer"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle />
          Add Member
        </Button>
      }
    >
      <MembersTable
        members={members}
        isLoading={isLoading}
        onEdit={setEditingMember}
        onDelete={setDeletingMember}
      />

      <AddMemberDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onConfirm={handleCreate}
        isSaving={createMutation.isPending}
      />

      {editingMember && (
        <EditMemberDialog
          member={editingMember}
          open={!!editingMember}
          onOpenChange={(open) => !open && setEditingMember(null)}
          onConfirm={handleUpdate}
          isSaving={updateMutation.isPending}
        />
      )}

      {deletingMember && (
        <DeleteMemberDialog
          member={deletingMember}
          open={!!deletingMember}
          onOpenChange={(open) => !open && setDeletingMember(null)}
          onConfirm={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </FeaturePageLayout>
  );
}
