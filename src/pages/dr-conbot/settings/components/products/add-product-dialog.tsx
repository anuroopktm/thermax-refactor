import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { type ProductForm as ProductFormType } from "../../validations/products.schema";
import { toast } from "sonner";
import {
  useCreateDrConbotProduct,
  useUpdateDrConbotProduct,
} from "@/services/query/dr-conbot/products.service";
import { type ProductModel } from "@/services/query/dr-conbot/types";

interface ProductDialogProps {
  product?: ProductModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({
  product,
  open,
  onOpenChange,
}: ProductDialogProps) {
  const createMutation = useCreateDrConbotProduct();
  const updateMutation = useUpdateDrConbotProduct(Number(product?.id || 0));

  const isEdit = !!product;

  const handleProductSubmit = async (data: ProductFormType) => {
    const action = isEdit
      ? updateMutation.mutateAsync(data)
      : createMutation.mutateAsync(data);

    toast.promise(action, {
      loading: isEdit ? "Updating product..." : "Adding product...",
      success: () => {
        onOpenChange(false);
        return isEdit
          ? "Product updated successfully"
          : "Product added successfully";
      },
      error: (err) => err?.response?.data?.detail || "Failed to save product",
    });
  };

  const defaultValues = product
    ? {
        title: product.name,
        short_title: product.models,
        description: product.description,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          defaultValues={defaultValues}
          onSubmit={handleProductSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEdit ? "Save Changes" : "Add Product"}
          isSaving={
            isEdit ? updateMutation.isPending : createMutation.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
}
