import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import type { UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

interface ActivityDataTableProps {
  fields: any[];
  register: UseFormRegister<any>;
  isLoading?: boolean;
}

const TABLE_HEADERS = [
  { label: "S.No" },
  { label: "Tag Number" },
  { label: "Model Number" },
  { label: "Lower Calibration Range" },
  { label: "Upper Calibration Range" },
  { label: "Calibration Range Unit" },
];

export function ActivityDataTable({
  fields,
  register,
  isLoading,
}: ActivityDataTableProps) {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeaderComponent />
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <SkeletonTableRows count={5} />
          ) : fields.length > 0 ? (
            fields.map((field, index) => (
              <ActivityRow
                key={field.id}
                field={field}
                index={index}
                register={register}
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
            "px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wide",
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
            <TableCell key={j} className="px-4 py-2">
              {j === 0 ? (
                <Skeleton className="h-4 w-8" />
              ) : (
                <Skeleton className="h-8 w-full rounded-md" />
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
              Add records or adjust your input to see data.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
};

/* ---------------- Row ---------------- */

const ActivityRow = ({
  field,
  index,
  register,
}: {
  field: any;
  index: number;
  register: UseFormRegister<any>;
}) => {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors border-b last:border-0">
      <TableCell className="px-4 py-2">{field.serialNo}</TableCell>

      <TableCell className="px-4 py-2">
        <Input {...register(`records.${index}.tagNumber`)} />
      </TableCell>

      <TableCell className="px-4 py-2">
        <Input {...register(`records.${index}.modelNumber`)} />
      </TableCell>

      <TableCell className="px-4 py-2">
        <Input {...register(`records.${index}.lowerRange`)} />
      </TableCell>

      <TableCell className="px-4 py-2">
        <Input {...register(`records.${index}.upperRange`)} />
      </TableCell>

      <TableCell className="px-4 py-2">
        <Input {...register(`records.${index}.unit`)} />
      </TableCell>
    </TableRow>
  );
};
