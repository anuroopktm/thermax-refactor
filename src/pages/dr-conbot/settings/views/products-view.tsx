import { useState } from "react";
import { ProductsHeader } from "../components/products/products-header";
import { ProductsList } from "../components/products/products-list";
import { AddProductDialog } from "../components/products/add-product-dialog";
import {
  useDrConbotProducts,
  useDeleteDrConbotProduct,
} from "@/services/query/dr-conbot/products.service";
import { type ProductModel } from "@/services/query/dr-conbot/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ProductsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null,
  );

  const { data: products = [], isLoading } = useDrConbotProducts(
    0,
    100,
    searchQuery,
  );
  const deleteMutation = useDeleteDrConbotProduct();

  const handleEditClick = (product: ProductModel) => {
    setSelectedProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleDeleteClick = async (product: ProductModel) => {
    if (
      confirm(
        `Are you sure you want to delete product "${product.name}"? This action cannot be undone.`,
      )
    ) {
      toast.promise(deleteMutation.mutateAsync(Number(product.id)), {
        loading: "Deleting product...",
        success: "Product deleted successfully",
        error: (err) =>
          err?.response?.data?.detail || "Failed to delete product",
      });
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <ProductsHeader
        onAdd={handleAddClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultsCount={products.length}
        totalCount={products.length}
      />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : products.length > 0 ? (
        <ProductsList
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}

      <AddProductDialog
        product={selectedProduct}
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) setSelectedProduct(null);
        }}
      />
    </div>
  );
}
