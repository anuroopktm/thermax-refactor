import { ActivityDataTable as SharedActivityDataTable } from "@/components/shared/ocr/activity-data-table";
import type { UseFormRegister } from "react-hook-form";

interface MasterDataTableProps {
  fields: any[];
  register: UseFormRegister<any>;
  isLoading?: boolean;
}

export function MasterDataTable(props: MasterDataTableProps) {
  return <SharedActivityDataTable {...props} />;
}
