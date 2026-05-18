import { memo } from "react";
import { Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FaqCard } from "./faq-card";
import { type FaqModel } from "@/services/query/dr-conbot/types";

interface FaqListProps {
  faqs: FaqModel[];
  isLoading?: boolean;
}

export function FaqList({ faqs, isLoading = false }: FaqListProps) {
  if (isLoading) {
    return <FaqSkeleton />;
  }

  if (faqs.length === 0) {
    return <FaqEmptyState />;
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FaqCard key={faq.id} faq={faq} />
      ))}
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

const FaqEmptyState = memo(() => {
  return (
    <Empty className="py-20 ">
      <EmptyHeader>
        <EmptyMedia>
          <Link2 className="size-8 text-primary" />
        </EmptyMedia>
        <EmptyTitle className="text-xl">No Documents Found</EmptyTitle>
        <EmptyDescription className="text-xs/relaxed">
          Upload FAQ documents or adjust your search to see results.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
});

FaqEmptyState.displayName = "FaqEmptyState";

/* ---------------- SKELETON ---------------- */

const FaqSkeleton = memo(() => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card
          key={i}
          className="animate-pulse bg-transparent py-4 px-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 rounded-md" />
            <Skeleton className="h-5 w-48 bg-muted" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24 bg-muted rounded-full" />
            <Skeleton className="size-8 rounded-full bg-muted" />
          </div>
        </Card>
      ))}
    </div>
  );
});

FaqSkeleton.displayName = "FaqSkeleton";
