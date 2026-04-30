import { useState } from "react";
import { useTbwesMembers } from "@/services/query/tbwes-ocr/tbwes-ocr.service";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { MembersTable } from "../components/members/members-table";
import { AddMemberDialog } from "../components/members/add-member-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data, isLoading, isFetching } = useTbwesMembers();

  return (
    <FeaturePageLayout
      title="Members"
      description={
        isLoading || isFetching
          ? "Loading members..."
          : `Showing ${data?.total ?? 0} members`
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
        members={data?.result || []}
        isLoading={isLoading || isFetching}
      />

      <AddMemberDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </FeaturePageLayout>
  );
}
