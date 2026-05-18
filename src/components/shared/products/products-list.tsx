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
import { ProductCard } from "./product-card";

interface ProductsListProps {
  products: Array<{
    id: string;
    name: string;
    description: string;
    models: string;
    fileCount: number;
  }>;
  isLoading?: boolean;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAttachFile: (product: any) => void;
  renderFilesList: (productId: string) => React.ReactNode;
}

export function ProductsList({
  products,
  isLoading = false,
  onEdit,
  onDelete,
  onAttachFile,
  renderFilesList,
}: ProductsListProps) {
  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
          onAttachFile={() => onAttachFile(product)}
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
        <EmptyTitle className="text-xl">No products found</EmptyTitle>
        <EmptyDescription className="text-xs/relaxed">
          Add products or adjust your search to see results.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
});

EmptyState.displayName = "EmptyState";

/* ---------------- SKELETON ---------------- */

const ProductsSkeleton = memo(() => {
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

ProductsSkeleton.displayName = "ProductsSkeleton";
