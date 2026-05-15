import { ActivityItemHeader as SharedActivityItemHeader } from "@/components/shared/ocr/activity-item-header";

interface MasterActivityModelHeaderProps {
  itemName: string;
  onGlobalUnitChange: (unit: string | null) => void;
  onSave: () => void;
  onBack?: () => void;
}

export function MasterActivityModelHeader(
  props: MasterActivityModelHeaderProps,
) {
  return <SharedActivityItemHeader title={props.itemName} {...props} />;
}
