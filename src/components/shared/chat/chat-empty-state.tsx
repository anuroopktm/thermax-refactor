import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

interface ChatEmptyStateProps {
  image: string;
  title: string;
  description: string;
}

export function ChatEmptyState({
  image,
  title,
  description,
}: ChatEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia className="mb-6 rounded-2xl border border-border/80 bg-card p-1.5 shadow-md max-w-[280px] aspect-square flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-xl"
          />
        </EmptyMedia>
        <EmptyTitle className="text-2xl font-bold tracking-tight text-foreground mb-2">
          {title}
        </EmptyTitle>
        <EmptyDescription className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
