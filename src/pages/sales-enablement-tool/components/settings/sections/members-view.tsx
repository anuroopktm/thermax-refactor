import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MemberActions } from "../components/members/member-actions";
import { type MemberForm as MemberFormType } from "@/validations/members";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MemberForm } from "../components/members/member-form";
import {
  useMembers,
  useCreateMember,
} from "@/services/query/members/members.service";
import { Skeleton } from "@/components/ui/skeleton";

export function MembersView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: members, isLoading } = useMembers();
  const { mutate: createMember, isPending: isSaving } = useCreateMember();

  const handleSubmit = async (data: MemberFormType) => {
    createMember(data, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading members..."
              : `Showing ${members?.length} members`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <InputGroup className="w-64 h-9 bg-muted/40 border rounded-lg">
            <InputGroupInput
              placeholder="Search members..."
              className="bg-transparent focus-visible:ring-0"
            />
            <InputGroupAddon className="text-muted-foreground">
              <Search className="size-4" />
            </InputGroupAddon>
          </InputGroup>

          <Button
            size="sm"
            className="h-9 cursor-pointer"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle className="size-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Name
              </TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Email
              </TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Role
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                ))
              : members?.map((member, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="text-xs font-medium">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {member.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {member.email}
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md capitalize">
                        {member.role}
                      </span>
                    </TableCell>

                    <TableCell className="text-right pr-4">
                      <MemberActions member={member} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription>
              Invite a new member to your team.
            </DialogDescription>
          </DialogHeader>

          <MemberForm
            onSubmit={handleSubmit}
            onCancel={() => setIsAddDialogOpen(false)}
            submitLabel="Add member"
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
