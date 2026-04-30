import { ActivityDataTable as SharedActivityDataTable } from "@/components/shared/ocr/activity-data-table";
import type { UseFormRegister } from "react-hook-form";

interface ActivityDataTableProps {
  fields: any[];
  register: UseFormRegister<any>;
  isLoading?: boolean;
}

export function ActivityDataTable(props: ActivityDataTableProps) {
  return <SharedActivityDataTable {...props} />;
}
