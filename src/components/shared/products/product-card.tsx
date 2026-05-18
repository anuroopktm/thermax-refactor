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
import { ProductActions } from "./product-actions";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    models: string;
    fileCount: number;
  };
  onEdit: () => void;
  onDelete: () => void;
  onAttachFile: () => void;
  renderFilesList: (productId: string) => React.ReactNode;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  onAttachFile,
  renderFilesList,
}: ProductCardProps) {
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

        <ProductActions onEdit={onEdit} onDelete={onDelete} />
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
            {renderFilesList(product.id)}
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="ml-auto cursor-pointer"
          onClick={onAttachFile}
        >
          <Plus />
          Attach File
        </Button>
      </CardFooter>
    </Card>
  );
}
