import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useThermaxGptChatMessages,
  useThermaxGptCreateChatHistory,
  useThermaxGptCreateChat,
  useThermaxGptChatHistoryStream,
} from "@/services/query/thermax-gpt/chat.service";
import { PATHS } from "@/routes/constants/routes";
import type { NormalizedMessage } from "@/components/shared/chat/types/chat.types";
import type { ChatHistoryResponse } from "@/services/query/thermax-gpt/types";

export const useThermaxChat = (chatId?: string) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [streamingMessage, setStreamingMessage] =
    useState<NormalizedMessage | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const { data: history = [], isLoading } = useThermaxGptChatMessages(chatId);
  const sendMessageMutation = useThermaxGptCreateChatHistory();
  const createChatMutation = useThermaxGptCreateChat();

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

        navigate(`${PATHS.THERMAX_GPT.ROOT}/${targetChatId}`, {
          replace: true,
        });
      }

      // Use a constant string for the ID to ensure consistency in closures and query keys
      const chatIdToUse = String(targetChatId);

      const historyItem = await sendMessageMutation.mutateAsync({
        chatId: chatIdToUse,
        human: message.trim(),
        model: modelId,
        thinking: isThinking,
      });

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["chat", "messages", chatIdToUse],
        exact: false,
      });

      // Manually update cache to include the user message
      queryClient.setQueryData<ChatHistoryResponse>(
        ["chat", "messages", chatIdToUse],
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

      await useThermaxGptChatHistoryStream(
        chatIdToUse,
        historyItem.id,
        modelId,
        isThinking,
        {
          onChunk: (_, fullText) => {
            setStreamingMessage({
              id: streamingId,
              role: "assistant",
              content: fullText,
              isThinking: false,
            });
          },

          onEnd: (fullText) => {
            queryClient.setQueryData<ChatHistoryResponse>(
              ["chat", "messages", chatIdToUse],
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
