import { memo } from "react";
import { PackageX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CategoryCard } from "./category-card";

interface CategoriesListProps {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    short_title: string;
    fileCount: number;
  }>;
  isLoading?: boolean;
  onEdit: (category: any) => void;
  onDelete: (category: any) => void;
  onAttachFile: (category: any) => void;
  renderFilesList: (categoryId: string) => React.ReactNode;
}

export function CategoriesList({
  categories,
  isLoading = false,
  onEdit,
  onDelete,
  onAttachFile,
  renderFilesList,
}: CategoriesListProps) {
  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (categories.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category)}
          onAttachFile={() => onAttachFile(category)}
          renderFilesList={renderFilesList}
        />
      ))}
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

const EmptyState = memo(() => {
  return (
    <Empty className="py-20">
      <EmptyHeader>
        <EmptyMedia>
          <PackageX className="size-8 text-primary" />
        </EmptyMedia>
        <EmptyTitle className="text-xl">No categories found</EmptyTitle>
        <EmptyDescription className="text-xs/relaxed">
          Add categories or adjust your search to see results.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
});

EmptyState.displayName = "EmptyState";

/* ---------------- SKELETON ---------------- */

const CategoriesSkeleton = memo(() => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
});

CategoriesSkeleton.displayName = "CategoriesSkeleton";
