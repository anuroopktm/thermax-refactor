import { Paperclip, SendHorizontal } from "lucide-react";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { TooltipWrapper } from "./tooltip-wrapper";
import { ModelSelector } from "./model-selector";

interface Props {
  onUpload: () => void;
  onSend: () => void;
  disabled?: boolean;
  canSend: boolean;
  model: string;
  setModel: (model: string) => void;
}

export function InputActions({
  onUpload,
  onSend,
  disabled,
  canSend,
  model,
  setModel,
}: Props) {
  return (
    <InputGroupAddon align="block-end">
      <TooltipWrapper
        render={
          <InputGroupButton
            variant="secondary"
            size="icon-sm"
            className="cursor-pointer"
            onClick={onUpload}
          >
            <Paperclip />
          </InputGroupButton>
        }
        content={<p>Attach files</p>}
      />

      <ModelSelector value={model} onChange={setModel} />

      <TooltipWrapper
        render={
          <InputGroupButton
            variant="default"
            size="icon-sm"
            onClick={onSend}
            disabled={disabled || !canSend}
            className="ml-auto cursor-pointer"
          >
            <SendHorizontal />
          </InputGroupButton>
        }
        content={<p>Send message</p>}
      />
    </InputGroupAddon>
  );
}
