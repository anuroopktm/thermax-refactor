import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type JSX } from "react";

export function TooltipWrapper({
  render,
  content,
  ...props
}: {
  render: React.ReactElement;
  content: JSX.Element;
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={render} {...props} />
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
