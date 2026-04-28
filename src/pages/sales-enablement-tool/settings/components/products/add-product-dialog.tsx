import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { type ProductForm as ProductFormType } from "@/validations/products.schema";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const handleAddProduct = async (data: ProductFormType) => {
    console.log("Adding product:", data);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
