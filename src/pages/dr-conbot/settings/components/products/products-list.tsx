import { ProductCard } from "./product-card";
import { type ProductModel } from "@/services/query/dr-conbot/types";

interface ProductsListProps {
  products: ProductModel[];
  onEdit: (product: ProductModel) => void;
  onDelete: (product: ProductModel) => void;
}

export function ProductsList({
  products,
  onEdit,
  onDelete,
}: ProductsListProps) {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
        />
      ))}
    </div>
  );
}
