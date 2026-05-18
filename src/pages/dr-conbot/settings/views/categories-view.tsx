import { useState, useMemo, memo } from "react";
import debounce from "lodash.debounce";
import { toast } from "sonner";

import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { conbotApi } from "@/services/interceptor";
import {
  useDrConbotCategories,
  useDeleteDrConbotCategory,
  useDrConbotCategoryDocuments,
  useDeleteDrConbotCategoryDocument,
} from "@/services/query/dr-conbot/categories.service";
import { type CategoryModel } from "@/services/query/dr-conbot/types";

// Local categories components
import { CategoriesHeader } from "../components/categories/categories-header";
import { CategoriesList } from "../components/categories/categories-list";
import { CategoryFilesList } from "../components/categories/category-files-list";

// Dialog components
import { AddCategoryDialog } from "../components/categories/add-category-dialog";
import { DeleteCategoryDialog } from "../components/categories/delete-category-dialog";
import { AttachFileDialog } from "../components/categories/attach-file-dialog";

export function CategoriesView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryModel | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryModel | null>(null);
  const [attachingCategory, setAttachingCategory] =
    useState<CategoryModel | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  const {
    data: categories = [],
    isLoading,
    isFetching,
  } = useDrConbotCategories(0, 100, debouncedSearch);
  const deleteMutation = useDeleteDrConbotCategory();

  const handleEditClick = (category: CategoryModel) => {
    setSelectedCategory(category);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async () => {
    if (deletingCategory) {
      toast.promise(deleteMutation.mutateAsync(Number(deletingCategory.id)), {
        loading: "Deleting category...",
        success: () => {
          setDeletingCategory(null);
          return "Category deleted successfully!";
        },
        error: (err) =>
          err?.response?.data?.detail || "Failed to delete category.",
      });
    }
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsAddDialogOpen(true);
  };

  const resultText =
    categories.length === 1
      ? "(1 Result of 1)"
      : `(${categories.length} Results of ${categories.length})`;

  return (
    <FeaturePageLayout
      className="p-0!"
      title="Categories"
      description={isLoading ? "Loading results..." : resultText}
      actions={
        <CategoriesHeader
          onAdd={handleAddClick}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      }
    >
      <CategoriesList
        categories={categories}
        isLoading={isLoading || isFetching}
        onEdit={handleEditClick}
        onDelete={setDeletingCategory}
        onAttachFile={setAttachingCategory}
        renderFilesList={(categoryId) => (
          <DrConbotCategoryFilesList categoryId={categoryId} />
        )}
      />

      <AddCategoryDialog
        category={selectedCategory}
        isEdit={!!selectedCategory}
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) setSelectedCategory(null);
        }}
      />

      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          onConfirm={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}

      {attachingCategory && (
        <AttachFileDialog
          open={!!attachingCategory}
          onOpenChange={(open) => !open && setAttachingCategory(null)}
          categoryId={attachingCategory.id}
          categoryName={attachingCategory.name}
        />
      )}
    </FeaturePageLayout>
  );
}

/* ---------------- LOCAL DOCUMENTS LIST ---------------- */

const DrConbotCategoryFilesList = memo(
  ({ categoryId }: { categoryId: string }) => {
    const { data: files = [], isLoading } = useDrConbotCategoryDocuments(
      Number(categoryId),
    );
    const deleteMutation = useDeleteDrConbotCategoryDocument(
      Number(categoryId),
    );
    const [downloadingFileId, setDownloadingFileId] = useState<string | null>(
      null,
    );

    const handleRemove = async (documentId: string) => {
      toast.promise(deleteMutation.mutateAsync(Number(documentId)), {
        loading: "Removing file...",
        success: "File removed successfully",
        error: "Failed to remove file",
      });
    };

    const handleDownload = async (documentId: string) => {
      setDownloadingFileId(documentId);
      try {
        const { data } = await conbotApi.get(
          `/doctor_conbot/category/${categoryId}/document/${documentId}/link`,
        );
        if (data?.link) {
          window.open(data.link, "_blank");
        } else {
          toast.error("Download link not available");
        }
      } catch (err) {
        toast.error("Failed to generate download link");
      } finally {
        setDownloadingFileId(null);
      }
    };

    return (
      <CategoryFilesList
        files={files}
        isLoading={isLoading}
        onRemove={handleRemove}
        onDownload={handleDownload}
        downloadingFileId={downloadingFileId}
      />
    );
  },
);

DrConbotCategoryFilesList.displayName = "DrConbotCategoryFilesList";
