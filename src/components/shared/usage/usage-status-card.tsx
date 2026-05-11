import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BarChart3 } from "lucide-react";

export interface StatusItem {
  name: string;
  value: React.ReactNode;
}

interface UsageStatusCardProps {
  title: string;
  data: StatusItem[];
  isLoading?: boolean;
}

const COLS = 2;
const SKELETON_ROWS = Array.from({ length: 5 });

export function UsageStatusCard({
  title,
  data = [],
  isLoading,
}: UsageStatusCardProps) {
  const hasData = data?.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="max-h-[300px] rounded-md border">
          <Table containerClassName="contents">
            <TableHeaderComponent />

            <TableBody>
              {isLoading ? (
                <SkeletonPlaceholder />
              ) : hasData ? (
                <TableRowComponent data={data} />
              ) : (
                <EmptyState />
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

/* ---------------- HEADER ---------------- */

const TableHeaderComponent = memo(() => {
  return (
    <TableHeader>
      <TableRow className="bg-background hover:bg-background">
        {["Name", "Value"].map((header) => (
          <TableHead key={header} className="sticky top-0 z-10 bg-background">
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
});

TableHeaderComponent.displayName = "TableHeaderComponent";

/* ---------------- ROWS ---------------- */

const TableRowComponent = memo(({ data }: { data: StatusItem[] }) => {
  return (
    <>
      {data.map((item) => (
        <TableRow key={`${item.name}-${String(item.value)}`}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.value}</TableCell>
        </TableRow>
      ))}
    </>
  );
});

TableRowComponent.displayName = "TableRowComponent";

/* ---------------- SKELETON ---------------- */

const SkeletonPlaceholder = memo(() => {
  return (
    <>
      {SKELETON_ROWS.map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
});

SkeletonPlaceholder.displayName = "SkeletonPlaceholder";

/* ---------------- EMPTY ---------------- */

const EmptyState = memo(() => {
  return (
    <TableRow>
      <TableCell
        colSpan={COLS}
        className="h-24 text-center text-muted-foreground bg-muted/5 border-b-0"
      >
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BarChart3 className="size-8" />
            </EmptyMedia>
            <EmptyTitle className="text-card-foreground">
              No data available
            </EmptyTitle>
            <EmptyDescription>
              There’s no data available for the selected period.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
});

EmptyState.displayName = "EmptyState";
