import { forwardRef, useState } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { Field, FieldDescription } from "@/components/ui/field";

import { ChatTextarea } from "./chat-textarea";
import { InputActions } from "./input-actions";
import { ChatFileUploadDialog } from "../upload/chat-file-upload-dialog";
import { MODELS } from "../types/input.types";

interface ChatInputProps {
  onSend: (content: string, modelId: string, isThinking: boolean) => void;
  disabled?: boolean;
}

export const ChatInput = forwardRef<HTMLDivElement, ChatInputProps>(
  ({ onSend, disabled }, ref) => {
    const [input, setInput] = useState("");
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [model, setModel] = useState(MODELS[0].id);

    const handleSend = () => {
      if (!input.trim() || disabled) return;

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
          <InputGroup className="border-primary/30 hover:border-primary/50 has-disabled:opacity-100">
            <ChatTextarea
              value={input}
              onChange={setInput}
              onSend={handleSend}
            />

            <InputActions
              onUpload={() => setIsUploadOpen(true)}
              onSend={handleSend}
              disabled={disabled}
              canSend={!!input.trim()}
              model={model}
              setModel={setModel}
            />
          </InputGroup>

          <FieldDescription className="text-center text-xs mb-4">
            Thermax AI Studio can make mistakes. Check important info.
          </FieldDescription>
        </Field>

        <ChatFileUploadDialog
          open={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          onUpload={(files) => console.log("Uploaded files:", files)}
        />
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
