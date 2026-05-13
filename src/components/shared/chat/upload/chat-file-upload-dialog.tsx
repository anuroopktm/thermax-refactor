import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { ChatFileDropzone } from "./chat-file-dropzone";
import { ChatFileList } from "./chat-file-list";

interface ChatFileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload?: (files: File[]) => void;
}

export function ChatFileUploadDialog({
  open,
  onOpenChange,
  onUpload,
}: ChatFileUploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFiles([]);
  }, [open]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles = Array.from(fileList);

    setFiles((prev) => {
      const existing = new Set(prev.map((f) => `${f.name}-${f.size}`));

      const merged = [
        ...prev,
        ...newFiles.filter((f) => !existing.has(`${f.name}-${f.size}`)),
      ];

      return merged;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    onUpload?.(files);
    onOpenChange(false);
    setFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <ChatFileDropzone onFilesSelected={handleFiles} />

          {files.length > 0 && (
            <ChatFileList files={files} onRemoveFile={removeFile} />
          )}

          <Alert className="border-amber-600 text-sky-600">
            <AlertDescription className="text-amber-600/80">
              Uploaded files are temporarily used as a knowledge source and
              automatically deleted after <strong>48 hours</strong>.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            }
          />

          <Button
            className="cursor-pointer"
            disabled={files.length === 0}
            onClick={handleUpload}
          >
            Upload Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
