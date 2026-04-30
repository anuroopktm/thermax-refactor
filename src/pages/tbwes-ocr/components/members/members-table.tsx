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
import { cn, getInitials } from "@/lib/utils";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MembersTableProps {
  members?: Member[];
  isLoading: boolean;
}

const TABLE_HEADERS = [
  { label: "Name" },
  { label: "Email" },
  { label: "Role" },
  { label: "", className: "w-12" },
];

export function MembersTable({ members, isLoading }: MembersTableProps) {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableHeader>
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
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
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
              ))
            : members?.map((member) => (
                <TableRow
                  key={member.id}
                  className="hover:bg-muted/30 transition-colors"
                >
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
  );
}
