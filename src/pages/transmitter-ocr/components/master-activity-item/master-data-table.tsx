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

import type { UseFormRegister } from "react-hook-form";

interface MasterDataTableProps {
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

export function MasterDataTable({
  fields,
  register,
  isLoading,
}: MasterDataTableProps) {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header.label}
                className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wide"
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <MasterDataSkeleton />
          ) : (
            fields.map((field, index) => (
              <TableRow
                key={field.id}
                className="hover:bg-muted/20 transition-colors border-b last:border-0"
              >
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function MasterDataSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="border-b last:border-0">
          <TableCell className="px-4 py-2">
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell className="px-4 py-2">
            <Skeleton className="h-8 w-full rounded-md" />
          </TableCell>
          <TableCell className="px-4 py-2">
            <Skeleton className="h-8 w-full rounded-md" />
          </TableCell>
          <TableCell className="px-4 py-2">
            <Skeleton className="h-8 w-full rounded-md" />
          </TableCell>
          <TableCell className="px-4 py-2">
            <Skeleton className="h-8 w-full rounded-md" />
          </TableCell>
          <TableCell className="px-4 py-2">
            <Skeleton className="h-8 w-full rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
