import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatFileCard } from "./chat-file-card";
import { Separator } from "@/components/ui/separator";

interface ChatFileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export function ChatFileList({ files, onRemoveFile }: ChatFileListProps) {
  if (files.length === 0) return null;

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Selected Files</h3>

          <Badge variant="outline">
            {files.length} File{files.length > 1 ? "s" : ""}
          </Badge>
        </div>

        <ScrollArea className="max-h-[30vh] flex flex-col pr-2">
          <div className="grid gap-3 p-1 sm:grid-cols-2">
            {files.map((file, index) => (
              <ChatFileCard
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => onRemoveFile(index)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <Separator />
    </>
  );
}
