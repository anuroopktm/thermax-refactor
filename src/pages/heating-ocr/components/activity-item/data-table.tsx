import { ActivityDataTable as SharedActivityDataTable } from "@/components/shared/ocr/activity-data-table";
import type { UseFormRegister } from "react-hook-form";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { type ActivityItemFormValues } from "../../validations/activity-item.schema";

interface ActivityDataTableProps {
  fields: DynamicField[];
  register: UseFormRegister<ActivityItemFormValues>;
  isLoading?: boolean;
}

export function ActivityDataTable(props: ActivityDataTableProps) {
  return <SharedActivityDataTable {...props} />;
}
