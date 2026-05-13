import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChatFileCardProps {
  file: File;
  onRemove: () => void;
}

const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export function ChatFileCard({ file, onRemove }: ChatFileCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle title={file.name}>{file.name}</CardTitle>
        <CardDescription>{formatSize(file.size)}</CardDescription>
        <CardAction>
          <Button
            size="icon-sm"
            variant="ghost"
            className="-mt-1.5 cursor-pointer text-destructive hover:text-destructive/75"
            onClick={onRemove}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
