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
import { cn } from "@/lib/utils";

import { type ActivitySummaryItem } from "@/services/query/transmitter-ocr/transmitter-ocr.types";

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
        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header.label}
                className={cn(
                  "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide",
                  header.className,
                )}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {isLoading ? (
            <ActivitySummarySkeleton />
          ) : (
            items.map((item) => (
              <ActivitySummaryRow key={item.id} item={item} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function ActivitySummaryRow({ item }: { item: ActivitySummaryItem }) {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors border-b last:border-0">
      {/* Serial No */}
      <TableCell className="px-6 py-5">{item.serialNo}</TableCell>

      {/* Tag Number */}
      <TableCell className="px-6 py-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="text-xs font-medium">TA</AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-foreground">
              {item.tagNumber}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {item.date}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Model */}
      <TableCell className="px-6 py-5">{item.modelNumber}</TableCell>

      {/* Unit */}
      <TableCell className="px-6 py-5">{item.unit}</TableCell>

      {/* Lower Range */}
      <TableCell className="px-6 py-5">{item.lowerRange}</TableCell>

      {/* Upper Range */}
      <TableCell className="px-6 py-5">{item.upperRange}</TableCell>

      {/* Status */}
      <TableCell className="px-6 py-5 text-center">
        <Badge variant={item.status === "PASSED" ? "success" : "error"}>
          {item.status}
        </Badge>
      </TableCell>

      {/* Remarks */}
      <TableCell className="px-6 py-5">
        <div className="space-y-1">
          {item.remarks.map((remark, idx) => {
            const isError =
              remark.includes("No value") || remark.includes("Invalid");

            const [rawKey, ...valueParts] = remark.split(":");
            const key = rawKey?.trim();
            const value = valueParts.join(":")?.trim();

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
}

function ActivitySummarySkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="border-b last:border-0">
          <TableCell className="px-6 py-5">
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell className="px-6 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </TableCell>
          <TableCell className="px-6 py-5">
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell className="px-6 py-5">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="px-6 py-5">
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell className="px-6 py-5">
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell className="px-6 py-5">
            <div className="flex justify-center">
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </TableCell>
          <TableCell className="px-6 py-5">
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
