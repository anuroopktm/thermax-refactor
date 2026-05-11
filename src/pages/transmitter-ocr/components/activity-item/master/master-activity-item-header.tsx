import { ActivityItemHeader as SharedActivityItemHeader } from "@/components/shared/ocr/activity-item-header";

interface MasterActivityItemHeaderProps {
  itemName: string;
  onGlobalUnitChange: (unit: string | null) => void;
  onSave: () => void;
  onBack?: () => void;
}

export function MasterActivityItemHeader(props: MasterActivityItemHeaderProps) {
  return <SharedActivityItemHeader title={props.itemName} {...props} />;
}
