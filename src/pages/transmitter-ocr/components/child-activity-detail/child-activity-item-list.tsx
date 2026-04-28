import {
  ChildActivityItemCard,
  type ChildActivitySubItem,
} from "./child-activity-item-card";

interface ChildActivityItemListProps {
  items: ChildActivitySubItem[];
}

export function ChildActivityItemList({ items }: ChildActivityItemListProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <ChildActivityItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
