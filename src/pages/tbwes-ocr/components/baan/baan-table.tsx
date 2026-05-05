import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import type { BaanRecord } from "@/services/query/tbwes-ocr/types";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";

interface BaanTableProps {
  data: BaanRecord[];
  isLoading?: boolean;
}

const TABLE_HEADERS = [
  { label: "BAAN ID" },
  { label: "Field" },
  { label: "Lower Limit" },
  { label: "Upper Limit" },
  { label: "Aspect ID" },
  { label: "Sequence" },
  { label: "Version" },
];

export function BaanTable({ data, isLoading }: BaanTableProps) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeaderComponent />
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <SkeletonTableRows count={5} />
          ) : data.length > 0 ? (
            data.map((record) => <BaanRow key={record.id} record={record} />)
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
          {Array.from({ length: TABLE_HEADERS.length }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

/* ---------------- Empty ---------------- */

const EmptyStateRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={TABLE_HEADERS.length}>
        <Empty className="py-20">
          <EmptyHeader>
            <EmptyMedia>
              <Database className="size-8 text-primary" />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              Add data or adjust your search to see results.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
};

/* ---------------- Row ---------------- */

const BaanRow = ({ record }: { record: BaanRecord }) => {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{record.baan_id}</TableCell>
      <TableCell>{record.field}</TableCell>
      <TableCell>{record.lower_limit}</TableCell>
      <TableCell>{record.upper_limit}</TableCell>
      <TableCell>{record.aspect_id}</TableCell>
      <TableCell>{record.sequence}</TableCell>
      <TableCell>{record.version}</TableCell>
    </TableRow>
  );
};
