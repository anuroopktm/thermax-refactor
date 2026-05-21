import { useEffect, useRef, useState, memo, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { UploadCloud } from "lucide-react";
import { ChatInput } from "./input/chat-input";
import { ChatMessages } from "./message/chat-message";
import { mergeUniqueFiles } from "./lib/chat-utils";
import { useFileDragAndDrop } from "./hooks/use-file-drag-and-drop";
import type { NormalizedMessage } from "./types";

interface ChatInterfaceProps {
  messages: NormalizedMessage[];
  isLoading?: boolean;
  isTyping?: boolean;
  onSend: (
    content: string,
    modelId: string,
    isThinking: boolean,
    files?: File[],
  ) => void;
  fileSupport?: boolean;
  modelSupport?: boolean;
  onUpload?: (files: File[]) => void;
  disclaimer?: ReactNode;
  emptyStateImage: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  suggestions?: string[];
  isSuggestionsLoading?: boolean;
}

export function ChatInterface({
  messages,
  isLoading,
  isTyping,
  onSend,
  fileSupport = true,
  modelSupport = true,
  onUpload,
  disclaimer,
  emptyStateImage,
  emptyStateTitle,
  emptyStateDescription,
  suggestions,
  isSuggestionsLoading,
}: ChatInterfaceProps) {
  const [bottomPadding, setBottomPadding] = useState<number>(120);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }, [messages, isTyping]);

  // Observe input height dynamically
  useEffect(() => {
    if (!inputContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setBottomPadding(height + 20);
    });

    observer.observe(inputContainerRef.current);

    return () => observer.disconnect();
  }, []);

  const { isDragging, dragProps } = useFileDragAndDrop({
    fileSupport,
    onFilesDrop: (newFiles) => {
      setAttachedFiles((prev) => mergeUniqueFiles(prev, newFiles));
    },
  });

  return (
    <div
      {...dragProps}
      className="relative flex flex-1 flex-col min-h-0 h-full bg-background overflow-hidden"
    >
      <DragOverlay visible={fileSupport && isDragging} />

      {/* Scrollable Content */}
      <ChatMessages
        ref={scrollRef}
        messages={messages}
        bottomPadding={bottomPadding}
        emptyStateImage={emptyStateImage}
        emptyStateTitle={emptyStateTitle}
        emptyStateDescription={emptyStateDescription}
      />

      {/* Input */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <ChatInput
          ref={inputContainerRef}
          onSend={(content, modelId, isThinking) => {
            onSend(content, modelId, isThinking, attachedFiles);
            setAttachedFiles([]);
          }}
          disabled={isTyping || isLoading}
          fileSupport={fileSupport}
          modelSupport={modelSupport}
          onUpload={(files) => {
            setAttachedFiles((prev) => mergeUniqueFiles(prev, files));
            onUpload?.(files);
          }}
          attachedFiles={attachedFiles}
          onRemoveFile={(index) => {
            setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
          }}
          disclaimer={disclaimer}
          suggestions={suggestions}
          isSuggestionsLoading={isSuggestionsLoading}
        />
      </div>
    </div>
  );
}

/* ----------------- Drag Overlay Sub-component ----------------- */

interface DragOverlayProps {
  visible: boolean;
}

const DragOverlay = memo(({ visible }: DragOverlayProps) => {
  if (!visible) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-xs">
      <div className="w-full max-w-lg px-6">
        <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-muted/40">
            <UploadCloud className="size-8 text-primary" />
          </div>

          <h3 className="text-lg font-medium tracking-tight text-foreground">
            Drop to upload files
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Attach files to your conversation. Images, documents, code files,
            and more are supported.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
});

DragOverlay.displayName = "DragOverlay";
