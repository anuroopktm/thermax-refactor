import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputGroupButton } from "@/components/ui/input-group";
import { MODELS, type Model } from "../types";
import { TooltipWrapper } from "./tooltip-wrapper";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export function ModelSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selected = MODELS.find((m) => m.id === value) ?? MODELS[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <TooltipWrapper
            render={
              <InputGroupButton
                variant="secondary"
                size="sm"
                className="cursor-pointer"
              >
                {selected.label}
              </InputGroupButton>
            }
            content={<p>Choose model</p>}
          />
        }
      />

      <PopoverContent className="w-56 gap-0" align="start">
        {MODELS.map((m: Model) => (
          <Button
            key={m.id}
            variant="ghost"
            onClick={() => {
              onChange(m.id);
              setOpen(false);
            }}
            className="h-fit py-2 flex w-full justify-between text-left cursor-pointer"
          >
            <div>
              <div className="text-sm font-medium">{m.label}</div>
              {m.description && (
                <div className="text-xs text-muted-foreground">
                  {m.description}
                </div>
              )}
            </div>

            {m.id === value && <Check />}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
