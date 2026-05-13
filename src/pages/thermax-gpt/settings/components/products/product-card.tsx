import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AttachFileDialog } from "./attach-file-dialog";
import { ProductActions } from "./product-actions";
import { ProductFilesList } from "./product-files-list";

export interface File {
  id: string;
  name: string;
  type: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  models: string;
  fileCount: number;
  files: File[];
}

export function ProductCard({ product }: { product: Product }) {
  const [isAttachDialogOpen, setIsAttachDialogOpen] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      {/* Header */}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          <p>{product.description}</p>
          <p className="mt-1 text-xs">
            Models: <strong>{product.models}</strong>
          </p>
        </CardDescription>

        <ProductActions />
      </CardHeader>

      <CardContent>
        <Accordion>
          <AccordionItem value="files">
            {/* Trigger */}
            <AccordionTrigger className="py-2 hover:no-underline cursor-pointer">
              <div className="flex items-center justify-between w-full pr-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">Files</span>
                  <span className="text-xs text-primary/80 font-normal">
                    (Click to view attached files)
                  </span>
                </div>
                <Badge variant="destructive">{product.fileCount} Files</Badge>
              </div>
            </AccordionTrigger>

            {/* Content */}
            <ProductFilesList files={product.files} />
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="ml-auto cursor-pointer"
          onClick={() => setIsAttachDialogOpen(true)}
        >
          <Plus />
          Attach File
        </Button>
      </CardFooter>

      <AttachFileDialog
        open={isAttachDialogOpen}
        onOpenChange={setIsAttachDialogOpen}
        productName={product.name}
      />
    </Card>
  );
}
