import { ActivityItemHeader as SharedActivityItemHeader } from "@/components/shared/ocr/activity-item-header";

interface ActivityItemHeaderProps {
  itemName: string;
  onGlobalUnitChange: (unit: string | null) => void;
  onSave: () => void;
}

export function ActivityItemHeader(props: ActivityItemHeaderProps) {
  return <SharedActivityItemHeader {...props} />;
}
