import { useState } from "react";
import { ProductsHeader } from "@/components/shared/products/products-header";
import { ProductsList } from "@/components/shared/products/products-list";
import { ProductFilesList } from "@/components/shared/products/product-files-list";
import { AddProductDialog } from "../components/products/add-product-dialog";

// Mock data for products
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Vertical Thermopac (VTB SG)",
    description:
      "Contains information regarding product Vertical Thermopac-VTB SG.",
    models: "VTB 04, VTB 06, VTB 10, VTB 15, VTB 20, VTB 25, VTB 30",
    fileCount: 3,
    files: [
      {
        id: "f1",
        name: "fixed_TS- VTB_TS_4 TO 30 LKCAL_INDIAN_COAL_HUSK_WOOD_IMPORTED COAL_R3.xls",
        type: "xls",
      },
      {
        id: "f2",
        name: "O&M Manual-Dynatherm VTB SG.pdf",
        type: "pdf",
      },
      {
        id: "f3",
        name: "Bro-Vertical Thermopac VTB.pdf",
        type: "pdf",
      },
    ],
  },
  {
    id: "2",
    name: "Thermopac Ultra (VTIF)",
    description:
      "Contains information regarding product Thermopac Ultra (VTIF).",
    models: "VTIF 10, VTIF 15, VTIF 20, VTIF 25, VTIF 30, VTIF-40",
    fileCount: 3,
    files: [],
  },
  {
    id: "3",
    name: "Steamatic (SG)",
    description: "Contains information regarding product Steamatic (SG).",
    models: "SG 100, SG 200, SG 300, SG 400, SG 500, SG 600",
    fileCount: 2,
    files: [],
  },
];

export function ProductsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter products based on search query
  const filteredProducts = MOCK_PRODUCTS.filter((product) =>
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
        onEdit={() => {}}
        onDelete={() => {}}
        onAttachFile={() => {}}
        renderFilesList={(productId) => {
          const product = MOCK_PRODUCTS.find((p) => p.id === productId);
          return <ProductFilesList files={product?.files || []} />;
        }}
      />

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
