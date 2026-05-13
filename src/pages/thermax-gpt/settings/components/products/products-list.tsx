import { ProductCard, type Product } from "./product-card";

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
