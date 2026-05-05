import type { ReactNode } from "react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MemberActions } from "./member-actions";
import { type Member } from "@/services/query/members/members.types";
import { cn, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserRoundX } from "lucide-react";

interface MembersTableProps {
  members?: Member[];
  isLoading: boolean;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  renderActions?: (member: Member) => ReactNode;
}

const TABLE_HEADERS = [
  { label: "Name" },
  { label: "Email" },
  { label: "Role" },
  { label: "", className: "w-12" },
];

export function MembersTable({
  members,
  isLoading,
  onEdit,
  onDelete,
  renderActions,
}: MembersTableProps) {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeaderComponent />
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <SkeletonTableRows count={5} />
          ) : members && members.length > 0 ? (
            members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onEdit={onEdit}
                onDelete={onDelete}
                renderActions={renderActions}
              />
            ))
          ) : (
            <EmptyStateRow />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/* ---------------- Header ---------------- */

const TableHeaderComponent = () => {
  return (
    <TableRow className="bg-muted/40 hover:bg-muted/40">
      {TABLE_HEADERS.map((header, idx) => (
        <TableHead
          key={header.label || idx}
          className={cn(
            "text-xs font-bold text-muted-foreground uppercase tracking-wide",
            header.className,
          )}
        >
          {header.label}
        </TableHead>
      ))}
    </TableRow>
  );
};

/* ---------------- Skeleton ---------------- */

const SkeletonTableRows = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
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
      ))}
    </>
  );
};

/* ---------------- Empty State (shadcn) ---------------- */

const EmptyStateRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={TABLE_HEADERS.length}>
        <Empty className="py-20">
          <EmptyHeader>
            <EmptyMedia>
              <UserRoundX className="size-8 text-primary" />
            </EmptyMedia>
            <EmptyTitle className="text-xl">No members found</EmptyTitle>
            <EmptyDescription className="text-xs/relaxed">
              Add members or adjust your search to see results.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
};

/* ---------------- Row ---------------- */

const MemberRow = React.memo(
  ({
    member,
    onEdit,
    onDelete,
    renderActions,
  }: {
    member: Member;
    onEdit: (member: Member) => void;
    onDelete: (member: Member) => void;
    renderActions?: (member: Member) => ReactNode;
  }) => {
    return (
      <TableRow className="hover:bg-muted/30 transition-colors">
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs font-medium">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>

            <span className="text-sm font-medium">{member.name}</span>
          </div>
        </TableCell>

        <TableCell className="text-sm text-muted-foreground">
          {member.email}
        </TableCell>

        <TableCell>
          <Badge variant="info" className="capitalize rounded-sm leading-none">
            {member.role.toLowerCase()}
          </Badge>
        </TableCell>

        <TableCell className="text-right pr-4">
          {renderActions ? (
            renderActions(member)
          ) : (
            <MemberActions
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </TableCell>
      </TableRow>
    );
  },
);

MemberRow.displayName = "MemberRow";
