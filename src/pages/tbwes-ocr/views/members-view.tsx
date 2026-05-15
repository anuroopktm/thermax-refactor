import { useState, useMemo } from "react";
import {
  useTbwesMembers,
  useTbwesCreateMember,
  useTbwesUpdateMember,
  useTbwesDeleteMember,
} from "@/services/query/tbwes-ocr";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { MembersTable } from "@/components/shared/members/members-table";
import { MembersHeader } from "@/components/shared/members/members-header";
import { AddMemberDialog } from "@/components/shared/members/add-member-dialog";
import { EditMemberDialog } from "@/components/shared/members/edit-member-dialog";
import { DeleteMemberDialog } from "@/components/shared/members/delete-member-dialog";
import { type Member } from "@/services/query/shared/types/members.types";
import debounce from "lodash.debounce";
import { toast } from "sonner";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  const { data, isLoading, isFetching } = useTbwesMembers({
    search_term: debouncedSearch || undefined,
    role: roleFilter === "ALL" ? undefined : roleFilter,
  });

  const createMutation = useTbwesCreateMember();
  const updateMutation = useTbwesUpdateMember(editingMember?.id || "");
  const deleteMutation = useTbwesDeleteMember();

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
      description="Manage your team members and their roles."
      actions={
        <MembersHeader
          onAdd={() => setIsAddDialogOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          roleFilter={roleFilter}
          onRoleFilterChange={(val) => val && setRoleFilter(val)}
        />
      }
    >
      <MembersTable
        members={data?.result || []}
        isLoading={isLoading || isFetching}
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
