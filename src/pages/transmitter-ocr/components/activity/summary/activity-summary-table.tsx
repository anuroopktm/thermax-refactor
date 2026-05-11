import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { cn, formatStatus, getStatusVariant, formatDate } from "@/lib/utils";

import { type ActivitySummaryItem } from "@/services/query/transmitter-ocr/types";

interface ActivitySummaryTableProps {
  items: ActivitySummaryItem[];
  isLoading?: boolean;
}

const TABLE_HEADERS = [
  { label: "Serial No." },
  { label: "Tag Number" },
  { label: "Model Number" },
  { label: "Calibration Range Unit" },
  { label: "Lower Calibration Range" },
  { label: "Upper Calibration Range" },
  { label: "Status", className: "text-center" },
  { label: "Remarks" },
];

export function ActivitySummaryTable({
  items,
  isLoading,
}: ActivitySummaryTableProps) {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeaderComponent />
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <SkeletonTableRows count={5} />
          ) : items.length > 0 ? (
            items.map((item) => (
              <ActivitySummaryRow key={item.id} item={item} />
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
            "px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wide",
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
        <TableRow key={i} className="border-b last:border-0">
          {Array.from({ length: TABLE_HEADERS.length }).map((_, j) => (
            <TableCell key={j} className="px-6 py-4">
              {j === 1 ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ) : j === 6 ? (
                <div className="flex justify-center">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ) : j === 7 ? (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ) : (
                <Skeleton className="h-4 w-20" />
              )}
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
            <EmptyTitle>No records found</EmptyTitle>
            <EmptyDescription>
              Add records or adjust your search to see results.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
};

/* ---------------- Helpers ---------------- */

const parseRemark = (remark: string) => {
  const isError = remark.includes("No value") || remark.includes("Invalid");

  const [rawKey, ...valueParts] = remark.split(":");
  const key = rawKey?.trim();
  const value = valueParts.join(":")?.trim();

  return { key, value, isError };
};

/* ---------------- Row ---------------- */

const ActivitySummaryRow = ({ item }: { item: ActivitySummaryItem }) => {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors border-b last:border-0">
      <TableCell className="px-6 py-4">{item.serialNo}</TableCell>

      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="text-xs font-medium">TA</AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold">{item.tagNumber}</span>
            <span className="text-[10px] text-muted-foreground">
              {formatDate(item.date)}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="px-6 py-4">{item.modelNumber}</TableCell>
      <TableCell className="px-6 py-4">{item.unit}</TableCell>
      <TableCell className="px-6 py-4">{item.lowerRange}</TableCell>
      <TableCell className="px-6 py-4">{item.upperRange}</TableCell>

      <TableCell className="px-6 py-4 text-center">
        <Badge variant={getStatusVariant(item.status)}>
          {formatStatus(item.status)}
        </Badge>
      </TableCell>

      <TableCell className="px-6 py-4">
        <div className="space-y-1">
          {item.remarks.map((remark, idx) => {
            const { key, value, isError } = parseRemark(remark);

            return (
              <div
                key={idx}
                className="grid grid-cols-[auto_1fr] gap-x-2 text-[11px] leading-snug"
              >
                <span
                  className={cn("font-semibold", isError && "text-destructive")}
                >
                  {key}
                  {value ? ":" : ""}
                </span>
                <span>{value || "-"}</span>
              </div>
            );
          })}
        </div>
      </TableCell>
    </TableRow>
  );
};
