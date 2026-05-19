import { forwardRef, memo, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Field, FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { getFileIcon } from "../lib/chat-utils";
import { ChatFileUploadDialog } from "../upload/chat-file-upload-dialog";
import { MODELS } from "../types";
import { ChatTextarea } from "./chat-textarea";
import { InputActions } from "./input-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatInputProps {
  onSend: (content: string, modelId: string, isThinking: boolean) => void;
  disabled?: boolean;
  fileSupport?: boolean;
  modelSupport?: boolean;
  onUpload?: (files: File[]) => void;
  attachedFiles?: File[];
  onRemoveFile?: (index: number) => void;
  disclaimer?: ReactNode;
}

export const ChatInput = forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      onSend,
      disabled,
      fileSupport = true,
      modelSupport = true,
      onUpload,
      attachedFiles = [],
      onRemoveFile,
      disclaimer = "Thermax AI Studio can make mistakes. Check important info.",
    },
    ref,
  ) => {
    const [input, setInput] = useState("");
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [model, setModel] = useState(MODELS[0].id);

    const handleSend = () => {
      const hasInput = !!input.trim();
      const hasFiles = !!(attachedFiles && attachedFiles.length > 0);

      if ((!hasInput && !hasFiles) || disabled) return;

      const selectedModel = MODELS.find((m) => m.id === model) || MODELS[0];

      onSend(input, model, selectedModel.thinking);
      setInput("");
    };

    return (
      <div
        ref={ref}
        className="max-w-[calc(100%-5rem)] mx-auto w-full pointer-events-auto bg-background p-1 rounded-t-xl"
      >
        <Field className="gap-4">
          <InputGroup className="border-primary/30 hover:border-primary/50 has-disabled:opacity-100 overflow-hidden">
            {fileSupport && attachedFiles.length > 0 && (
              <InputGroupAddon
                align="block-start"
                className="border-b w-full gap-2 overflow-x-auto flex-nowrap scrollbar-none py-2 px-3 justify-start max-h-24"
              >
                {attachedFiles.map((file, index) => (
                  <AttachedFileChip
                    key={`${file.name}-${index}`}
                    file={file}
                    onRemove={() => onRemoveFile?.(index)}
                  />
                ))}
              </InputGroupAddon>
            )}

            <ChatTextarea
              value={input}
              onChange={setInput}
              onSend={handleSend}
            />

            <InputActions
              onUpload={() => setIsUploadOpen(true)}
              onSend={handleSend}
              disabled={disabled}
              canSend={
                !!input.trim() || (attachedFiles && attachedFiles.length > 0)
              }
              model={model}
              setModel={setModel}
              fileSupport={fileSupport}
              modelSupport={modelSupport}
            />
          </InputGroup>

          {disclaimer && (
            <FieldDescription className="text-center text-xs mb-4">
              {disclaimer}
            </FieldDescription>
          )}
        </Field>

        {fileSupport && (
          <ChatFileUploadDialog
            open={isUploadOpen}
            onOpenChange={setIsUploadOpen}
            onUpload={onUpload}
          />
        )}
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";

/* ---------------- Attached File Chip Sub-component ---------------- */

interface AttachedFileChipProps {
  file: File;
  onRemove: () => void;
}

const AttachedFileChip = memo(({ file, onRemove }: AttachedFileChipProps) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1.5 bg-muted/50 hover:bg-muted border border-border/50 hover:border-border cursor-pointer pl-2.5 pr-1 py-1 h-8 max-w-60 min-w-32 shrink-0 rounded-lg"
    >
      {getFileIcon(file)}
      <span
        className="truncate font-medium flex-1 text-foreground text-left select-none max-w-36"
        title={file.name}
      >
        {file.name}
      </span>
      <Button
        type="button"
        onClick={onRemove}
        variant="ghost"
        size="icon"
        className="group size-5 rounded-full cursor-pointer p-0 -ml-1"
      >
        <X className="size-3 group-hover:text-primary" />
      </Button>
    </Badge>
  );
});

AttachedFileChip.displayName = "AttachedFileChip";
