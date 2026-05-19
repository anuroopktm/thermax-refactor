import { useState, memo } from "react";
import { ProductsHeader } from "@/components/shared/products/products-header";
import { ProductsList } from "@/components/shared/products/products-list";
import { ProductFilesList } from "@/components/shared/products/product-files-list";
import { AddProductDialog } from "../components/products/add-product-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/shared/products/product-form";
import { FileForm } from "@/components/shared/products/file-form";
import {
  useProducts,
  useUpdateProduct,
  useDeleteProduct,
  useProductDocuments,
  useUploadProductDocument,
  useDeleteProductDocument,
  fetchProductDocumentLink,
} from "@/services/query/sales-enablement/products.service";
import { toast } from "sonner";
import {
  type ProductForm as ProductFormType,
  type AttachFileForm as AttachFileFormType,
} from "@/lib/validations/products.schema";

/* ---------------- Product Files List Wrapper ---------------- */
interface ProductFilesWrapperProps {
  productId: string;
}

const ProductFilesWrapper = memo(({ productId }: ProductFilesWrapperProps) => {
  const { data: documents = [], isLoading } = useProductDocuments(productId);
  const deleteDocument = useDeleteProductDocument(productId);
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(
    null,
  );

  const files = documents.map((doc) => ({
    id: String(doc.id),
    name: doc.filename,
    type: doc.filename.split(".").pop() || "pdf",
    status: doc.status,
    kind: doc.kind,
    description: doc.description,
  }));

  const handleDownload = async (fileId: string) => {
    setDownloadingFileId(fileId);
    try {
      const url = await fetchProductDocumentLink(productId, fileId);
      if (url) {
        window.open(url, "_blank");
      } else {
        toast.error("Download link not found");
      }
    } catch {
      toast.error("Failed to retrieve download link");
    } finally {
      setDownloadingFileId(null);
    }
  };

  const handleRemove = async (fileId: string) => {
    toast.promise(deleteDocument.mutateAsync(fileId), {
      loading: "Removing file...",
      success: "File removed successfully",
      error: "Failed to remove file",
    });
  };

  return (
    <ProductFilesList
      files={files}
      isLoading={isLoading}
      onRemove={handleRemove}
      onDownload={handleDownload}
      downloadingFileId={downloadingFileId}
    />
  );
});

ProductFilesWrapper.displayName = "ProductFilesWrapper";

/* ---------------- Edit Product Dialog ---------------- */
interface EditProductDialogProps {
  product: {
    id: string;
    name: string;
    description: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProductDialog = memo(
  ({ product, open, onOpenChange }: EditProductDialogProps) => {
    const updateProduct = useUpdateProduct(product?.id || "");

    const handleUpdate = async (data: ProductFormType) => {
      await toast.promise(updateProduct.mutateAsync(data), {
        loading: "Saving product details...",
        success: () => {
          onOpenChange(false);
          return "Product updated successfully";
        },
        error: "Failed to update product",
      });
    };

    if (!product) return null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSubmit={handleUpdate}
            onCancel={() => onOpenChange(false)}
            defaultValues={{
              title: product.name,
              short_title: product.name,
              description: product.description,
            }}
            isSaving={updateProduct.isPending}
          />
        </DialogContent>
      </Dialog>
    );
  },
);

EditProductDialog.displayName = "EditProductDialog";

/* ---------------- Attach File Dialog ---------------- */
interface AttachFileDialogProps {
  productId: string | number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AttachFileDialog = memo(
  ({ productId, open, onOpenChange }: AttachFileDialogProps) => {
    const uploadDocument = useUploadProductDocument(productId || "");

    const handleAttach = async (data: AttachFileFormType) => {
      if (!productId) return;

      const file = data.document?.[0];
      if (!file) {
        toast.error("Please select a file first");
        return;
      }

      await toast.promise(
        uploadDocument.mutateAsync({
          file,
          description: data.description,
          kind: data.kind,
        }),
        {
          loading: "Uploading document...",
          success: () => {
            onOpenChange(false);
            return "Document uploaded successfully";
          },
          error: "Failed to upload document",
        },
      );
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Attach File to Product</DialogTitle>
          </DialogHeader>
          <FileForm
            onSubmit={handleAttach}
            onCancel={() => onOpenChange(false)}
            isSaving={uploadDocument.isPending}
            submitLabel="Upload"
          />
        </DialogContent>
      </Dialog>
    );
  },
);

AttachFileDialog.displayName = "AttachFileDialog";

/* ---------------- Main Products View ---------------- */
export function ProductsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);
  const [attachingProductId, setAttachingProductId] = useState<string | null>(
    null,
  );

  const { data: products = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (product: { id: string; name: string }) => {
    const confirmed = confirm(
      `Are you sure you want to delete the product "${product.name}"?`,
    );
    if (!confirmed) return;

    await toast.promise(deleteProduct.mutateAsync(product.id), {
      loading: "Deleting product...",
      success: "Product deleted successfully",
      error: "Failed to delete product",
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <ProductsHeader
        onAdd={() => setIsAddDialogOpen(true)}
        searchTerm={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ProductsList
        products={filteredProducts}
        isLoading={isLoading}
        onEdit={(p) => setEditingProduct(p)}
        onDelete={handleDelete}
        onAttachFile={(p) => setAttachingProductId(p.id)}
        renderFilesList={(productId) => (
          <ProductFilesWrapper productId={productId} />
        )}
      />

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      <EditProductDialog
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(open) => {
          if (!open) setEditingProduct(null);
        }}
      />

      <AttachFileDialog
        productId={attachingProductId}
        open={!!attachingProductId}
        onOpenChange={(open) => {
          if (!open) setAttachingProductId(null);
        }}
      />
    </div>
  );
}
