import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDrConbotChatMessages,
  useDrConbotCreateChatHistory,
  useDrConbotCreateChat,
  useDrConbotChatHistoryStream,
} from "@/services/query/dr-conbot/chat.service";
import { PATHS } from "@/routes/constants/routes";
import type { NormalizedMessage } from "@/components/shared/chat/types";
import type { ChatHistoryResponse } from "@/services/query/dr-conbot/types";
import { drConbotKeys } from "@/services/query/dr-conbot/keys";

export const useDrConbotChat = (chatId?: string) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [streamingMessage, setStreamingMessage] =
    useState<NormalizedMessage | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const { data: history = [], isLoading } = useDrConbotChatMessages(chatId);
  const sendMessageMutation = useDrConbotCreateChatHistory();
  const createChatMutation = useDrConbotCreateChat();

  const messages = useMemo(() => {
    if (!streamingMessage) return history;

    const isAlreadyInHistory = history.some(
      (m) => m.id === streamingMessage.id,
    );

    return isAlreadyInHistory ? history : [...history, streamingMessage];
  }, [history, streamingMessage]);

  const sendMessage = async (
    message: string,
    modelId: string,
    isThinking: boolean,
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

      const historyItem = await sendMessageMutation.mutateAsync({
        chatId: chatIdToUse,
        human: message.trim(),
        model: modelId,
        thinking: isThinking,
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
            result: [...current.result, historyItem],
            total: current.total + 1,
          };
        },
      );

      const streamingId = `${historyItem.id}-ai`;
      setStreamingMessage({
        id: streamingId,
        role: "assistant",
        content: "",
        isThinking: true,
      });

      await useDrConbotChatHistoryStream(
        chatIdToUse,
        modelId,
        isThinking,
        message.trim(),
        {
          onChunk: (_, fullText: string) => {
            setStreamingMessage({
              id: streamingId,
              role: "assistant",
              content: fullText,
              isThinking: false,
            });
          },

          onEnd: (fullText: string) => {
            queryClient.setQueryData<ChatHistoryResponse>(
              drConbotKeys.chat.messages(chatIdToUse),
              (old) => {
                const current = old ?? {
                  total: 1,
                  result: [historyItem],
                };

                return {
                  ...current,
                  result: current.result.map((item) =>
                    item.id === historyItem.id
                      ? { ...item, ai: fullText }
                      : item,
                  ),
                };
              },
            );

            setStreamingMessage(null);
            setIsTyping(false);
          },

          onError: () => {
            setIsTyping(false);
            setStreamingMessage(null);
          },
        },
      );
    } catch (error) {
      setIsTyping(false);
      setStreamingMessage(null);
    }
  };

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    isSending: sendMessageMutation.isPending,
    isCreating: createChatMutation.isPending,
  };
};
