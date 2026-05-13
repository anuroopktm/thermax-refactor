import { forwardRef, useState } from "react";
import { SendHorizontal, Paperclip } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Field, FieldDescription } from "@/components/ui/field";
import { ChatFileUploadDialog } from "./upload/chat-file-upload-dialog";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput = forwardRef<HTMLDivElement, ChatInputProps>(
  ({ onSend, disabled }, ref) => {
    const [input, setInput] = useState("");
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleSend = () => {
      if (!input.trim() || disabled) return;
      onSend(input);
      setInput("");
    };

    return (
      <div
        ref={ref}
        className="max-w-[calc(100%-5rem)] mx-auto w-full pointer-events-auto bg-background p-1 rounded-t-xl"
      >
        <Field className="gap-4">
          <InputGroup className="border-primary/30 hover:border-primary/50">
            <InputGroupTextarea
              autoFocus
              placeholder="Message AI Studio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="min-h-8 max-h-48 resize-none overflow-y-auto"
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsUploadOpen(true)}
                className="text-primary rounded-full cursor-pointer"
              >
                <Paperclip />
              </InputGroupButton>
              <InputGroupButton
                variant="default"
                size="icon-sm"
                onClick={handleSend}
                disabled={disabled || !input.trim()}
                className="ml-auto rounded-full cursor-pointer"
              >
                <SendHorizontal />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          <FieldDescription className="text-center text-xs mb-4">
            Thermax AI Studio can make mistakes. Check important info.
          </FieldDescription>
        </Field>

        <ChatFileUploadDialog
          open={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          onUpload={(files) => {
            console.log("Uploaded files:", files);
            setIsUploadOpen(false);
          }}
        />
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
