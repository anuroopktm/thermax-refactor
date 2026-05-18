import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/shared/products/product-form";
import { type ProductForm as ProductFormType } from "@/lib/validations/products.schema";
import { toast } from "sonner";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const handleAddProduct = async (_: ProductFormType) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Adding product...",
      success: () => {
        onOpenChange(false);
        return "Product added successfully";
      },
      error: "Failed to add product",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
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
