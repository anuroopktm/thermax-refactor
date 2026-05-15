import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Chat } from "../types";
import { Field, FieldError } from "@/components/ui/field";

interface ChatUpdateDialogProps {
  chat: Chat | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (title: string) => Promise<void>;
  isLoading?: boolean;
}

const chatUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
});

type FormValues = z.infer<typeof chatUpdateSchema>;

export function ChatUpdateDialog({
  chat,
  open,
  onOpenChange,
  onUpdate,
  isLoading,
}: ChatUpdateDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(chatUpdateSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (chat && open) {
      reset({
        title: chat.title,
      });
    }
  }, [chat, open, reset]);

  const handleFormSubmit = async (data: FormValues) => {
    await onUpdate(data.title);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
          </DialogHeader>

          <Field className="py-4">
            <Label htmlFor="chat-title">Chat Title</Label>

            <Input
              id="chat-title"
              placeholder="Enter chat title"
              {...register("title")}
            />

            <FieldError errors={[errors.title]} />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
