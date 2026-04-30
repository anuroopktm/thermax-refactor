import { useState } from "react";
import { useMembers } from "@/services/query/members/members.service";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { MembersTable } from "@/components/shared/members/members-table";
import { AddMemberDialog } from "@/components/shared/members/add-member-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: members, isLoading } = useMembers();

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
      <MembersTable members={members} isLoading={isLoading} />

      <AddMemberDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </FeaturePageLayout>
  );
}
