import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";
import { type CategoryForm as CategoryFormType } from "../../validations/categories.schema";
import { toast } from "sonner";
import {
  useCreateDrConbotCategory,
  useUpdateDrConbotCategory,
} from "@/services/query/dr-conbot/categories.service";
import { type CategoryModel } from "@/services/query/dr-conbot/types";

interface CategoryDialogProps {
  category?: CategoryModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
}

export function AddCategoryDialog({
  category,
  open,
  onOpenChange,
  isEdit,
}: CategoryDialogProps) {
  const createMutation = useCreateDrConbotCategory();
  const updateMutation = useUpdateDrConbotCategory(Number(category?.id || 0));

  const handleCategorySubmit = async (data: CategoryFormType) => {
    const action = isEdit
      ? updateMutation.mutateAsync(data)
      : createMutation.mutateAsync(data);

    toast.promise(action, {
      loading: isEdit ? "Updating category..." : "Adding category...",
      success: () => {
        onOpenChange(false);
        return isEdit
          ? "Category updated successfully"
          : "Category added successfully";
      },
      error: (err) => err?.response?.data?.detail || "Failed to save category",
    });
  };

  const defaultValues = category
    ? {
        title: category.name,
        short_title: category.short_title,
        description: category.description,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          defaultValues={defaultValues}
          onSubmit={handleCategorySubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEdit ? "Save Changes" : "Add Category"}
          isSaving={
            isEdit ? updateMutation.isPending : createMutation.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
}
