import { useState } from "react";
import { useMembers } from "@/services/query/members/members.service";
import { MembersHeader } from "../components/members/members-header";
import { MembersTable } from "../components/members/members-table";
import { AddMemberDialog } from "../components/members/add-member-dialog";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: members, isLoading } = useMembers();

  return (
    <div className="space-y-6">
      <MembersHeader
        onAdd={() => setIsAddDialogOpen(true)}
        count={members?.length}
        isLoading={isLoading}
      />

      <MembersTable members={members} isLoading={isLoading} />

      <AddMemberDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
