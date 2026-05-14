import { InputGroupTextarea } from "@/components/ui/input-group";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export function ChatTextarea({ value, onChange, onSend }: Props) {
  return (
    <InputGroupTextarea
      autoFocus
      placeholder="Message AI Studio..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      }}
      className="min-h-8 max-h-48 resize-none overflow-y-auto"
    />
  );
}
