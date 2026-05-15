import {
  ChildActivityModelCard,
  type ChildActivitySubItem,
} from "./child-activity-item-card";

interface ChildActivityModelListProps {
  items: ChildActivitySubItem[];
}

export function ChildActivityModelList({ items }: ChildActivityModelListProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <ChildActivityModelCard key={item.id} item={item} />
      ))}
    </div>
  );
}
