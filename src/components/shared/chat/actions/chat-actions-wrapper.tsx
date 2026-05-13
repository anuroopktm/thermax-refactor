import { useState } from "react";

import { ChatUpdateDialog } from "@/components/shared/chat/actions/chat-update-dialog";
import { ChatDeleteDialog } from "@/components/shared/chat/actions/chat-delete-dialog";

import { ChatActionsMenu } from "./chat-actions-menu";

import type { Chat } from "@/components/shared/chat/types/chat.types";

interface ChatActionsWrapperProps {
  chat: Chat;
  onUpdate: (title: string) => Promise<void>;
  onDelete: () => Promise<void>;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function ChatActionsWrapper({
  chat,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: ChatActionsWrapperProps) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleUpdate = async (title: string) => {
    await onUpdate(title);
    setShowUpdate(false);
  };

  const handleDelete = async () => {
    await onDelete();
    setShowDelete(false);
  };

  return (
    <>
      <ChatActionsMenu
        onEdit={() => setShowUpdate(true)}
        onDelete={() => setShowDelete(true)}
      />

      <ChatUpdateDialog
        chat={chat}
        open={showUpdate}
        onOpenChange={setShowUpdate}
        onUpdate={handleUpdate}
        isLoading={isUpdating}
      />

      <ChatDeleteDialog
        chat={chat}
        open={showDelete}
        onOpenChange={setShowDelete}
        onDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
