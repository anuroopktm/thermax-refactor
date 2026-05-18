import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDrConbotChatMessages,
  useDrConbotCreateChat,
  useDrConbotSendAgentMessage,
} from "@/services/query/dr-conbot/chat.service";
import { PATHS } from "@/routes/constants/routes";
import type { ChatHistoryResponse } from "@/services/query/dr-conbot/types";
import { drConbotKeys } from "@/services/query/dr-conbot/keys";
import type { NormalizedMessage } from "@/components/shared/chat/types";

export const useDrConbotChat = (chatId?: string) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] =
    useState<NormalizedMessage | null>(null);

  const { data: history = [], isLoading } = useDrConbotChatMessages(chatId);
  const sendAgentMessageMutation = useDrConbotSendAgentMessage();
  const createChatMutation = useDrConbotCreateChat();

  const messages = useMemo(() => {
    const list = [...history];

    if (pendingUserMessage) {
      const isAlreadyInHistory = history.some(
        (m) => m.id === pendingUserMessage.id,
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

  const sendMessage = async (
    message: string,
    _modelId?: string,
    _isThinking?: boolean,
  ) => {
    if (!message.trim()) return;

    try {
      setIsTyping(true);

      let targetChatId = chatId;

      if (!targetChatId) {
        const newChat = await createChatMutation.mutateAsync({
          title: message.trim(),
          type: "",
        });

        targetChatId = String(newChat.id);

        navigate(`${PATHS.DR_CONBOT.ROOT}/${targetChatId}`, {
          replace: true,
        });
      }

      const chatIdToUse = String(targetChatId);

      const tempId = `temp-${Date.now()}-human`;
      const tempUserMsg: NormalizedMessage = {
        id: tempId,
        role: "user",
        content: message.trim(),
      };

      setPendingUserMessage(tempUserMsg);

      const agentResponse = await sendAgentMessageMutation.mutateAsync({
        chatId: chatIdToUse,
        human: message.trim(),
      });

      await queryClient.cancelQueries({
        queryKey: drConbotKeys.chat.messages(chatIdToUse),
        exact: false,
      });

      queryClient.setQueryData<ChatHistoryResponse>(
        drConbotKeys.chat.messages(chatIdToUse),
        (old) => {
          const current = old ?? { total: 0, result: [] };
          return {
            ...current,
            result: [...current.result, agentResponse],
            total: current.total + 1,
          };
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
    isSending: sendAgentMessageMutation.isPending,
    isCreating: createChatMutation.isPending,
  };
};
