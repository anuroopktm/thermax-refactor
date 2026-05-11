import { useState } from "react";
import {
  useTransmitterMembers as useMembers,
  useTransmitterCreateMember as useCreateMember,
  useTransmitterUpdateMember as useUpdateMember,
  useTransmitterDeleteMember as useDeleteMember,
} from "@/services/query/transmitter-ocr/types/index";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { MembersTable } from "@/components/shared/members/members-table";
import { AddMemberDialog } from "@/components/shared/members/add-member-dialog";
import { EditMemberDialog } from "@/components/shared/members/edit-member-dialog";
import { DeleteMemberDialog } from "@/components/shared/members/delete-member-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { type Member } from "@/services/query/transmitter-ocr/types";
import { toast } from "sonner";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const { data: members, isLoading } = useMembers();

  const createMutation = useCreateMember();
  const updateMutation = useUpdateMember(editingMember?.id || "");
  const deleteMutation = useDeleteMember();

  const handleCreate = async (data: any) => {
    toast.promise(createMutation.mutateAsync(data), {
      loading: "Adding member...",
      success: () => {
        setIsAddDialogOpen(false);
        return "Member added successfully!";
      },
      error: (err) => err.response?.data?.detail || "Failed to add member.",
    });
  };

  const handleUpdate = async (data: any) => {
    toast.promise(updateMutation.mutateAsync(data), {
      loading: "Updating member...",
      success: () => {
        setEditingMember(null);
        return "Member updated successfully!";
      },
      error: (err) => err.response?.data?.detail || "Failed to update member.",
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
        error: (err) =>
          err.response?.data?.detail || "Failed to delete member.",
      });
    }
  };

  return (
    <FeaturePageLayout
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
