import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useChatHistory,
  useCreateChat,
  useSendChatMessage,
} from "@/services/query/edge-bot/chat.service";
import { edgeBotKeys } from "@/services/query/edge-bot/keys";
import { PATHS } from "@/routes/constants/routes";
import type { NormalizedMessage } from "@/components/shared/chat/types";
import type { ChatHistoryResponse } from "@/services/query/edge-bot/types";

export const useEdgeBotChat = (chatId?: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isTyping, setIsTyping] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] =
    useState<NormalizedMessage | null>(null);

  const { data: history = [], isLoading } = useChatHistory(chatId);
  const sendChatMessage = useSendChatMessage();
  const createChat = useCreateChat();

  const messages = useMemo(() => {
    const list = [...history];

    if (pendingUserMessage) {
      const isAlreadyInHistory = history.some(
        (m) =>
          m.id === pendingUserMessage.id ||
          (m.role === "user" && m.content === pendingUserMessage.content),
      );
      if (!isAlreadyInHistory) {
        list.push(pendingUserMessage);
      }
    }

    if (isTyping) {
      list.push({
        id: "temp-typing-indicator",
        role: "assistant",
        content: "",
        isThinking: true,
      });
    }

    return list;
  }, [history, pendingUserMessage, isTyping]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      setIsTyping(true);

      let targetChatId = chatId;

      if (!targetChatId) {
        const newChat = await createChat.mutateAsync(message.trim());

        targetChatId = String(newChat.id);

        const edgeBotRoot = PATHS.EDGE_BOT.ROOT;
        navigate(`${edgeBotRoot}/${targetChatId}`, {
          replace: true,
        });
      }

      const chatIdToUse = targetChatId;

      const tempId = `temp-${Date.now()}-human`;
      const tempUserMsg: NormalizedMessage = {
        id: tempId,
        role: "user",
        content: message.trim(),
      };

      setPendingUserMessage(tempUserMsg);

      const agentResponse = await sendChatMessage.mutateAsync({
        chatId: chatIdToUse,
        messageText: message.trim(),
      });

      await queryClient.cancelQueries({
        queryKey: edgeBotKeys.chats.history(chatIdToUse),
        exact: false,
      });

      queryClient.setQueryData<ChatHistoryResponse[]>(
        edgeBotKeys.chats.history(chatIdToUse),
        (old) => {
          const current = old ?? [];
          return [...current, agentResponse];
        },
      );
    } finally {
      setPendingUserMessage(null);
      setIsTyping(false);
    }
  };

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    isSending: sendChatMessage.isPending,
    isCreating: createChat.isPending,
  };
};
