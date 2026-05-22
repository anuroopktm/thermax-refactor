import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { edgeApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { edgeBotKeys } from "./keys";
import { mapChats, mapChatHistory } from "@/pages/edge-bot/lib/edge-mappers";
import type { ChatResponse, ChatHistoryResponse } from "./types";
import {
  type Chat,
  type NormalizedMessage,
} from "@/components/shared/chat/types";

export const useChats = () => {
  return useQuery<ChatResponse[], AxiosError<ApiError>, Chat[]>({
    queryKey: edgeBotKeys.chats.all,
    queryFn: async () => {
      const { data } = await edgeApi.get(
        "/edgeagent-playground/playground_edgebot/chat",
      );
      return data.result;
    },
    select: mapChats,
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation<ChatResponse, AxiosError<ApiError>, string>({
    mutationFn: async (title: string) => {
      const { data } = await edgeApi.post(
        "/edgeagent-playground/playground_edgebot/chat",
        null,
        {
          params: { title },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.chats.all,
      });
    },
  });
};

export const useUpdateChat = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ChatResponse,
    AxiosError<ApiError>,
    { chatId: string | number; title: string }
  >({
    mutationFn: async ({ chatId, title }) => {
      const { data } = await edgeApi.patch(
        `/edgeagent-playground/playground_edgebot/chat/${chatId}`,
        null,
        {
          params: { title },
        },
      );
      return data;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.chats.all,
      });
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.chats.detail(chatId),
      });
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await edgeApi.delete(
        `/edgeagent-playground/playground_edgebot/chat/${id}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.chats.all,
      });
    },
  });
};

export const useChatHistory = (chatId: string | number | undefined) => {
  return useQuery<
    ChatHistoryResponse[],
    AxiosError<ApiError>,
    NormalizedMessage[]
  >({
    queryKey: edgeBotKeys.chats.history(chatId || ""),
    queryFn: async () => {
      if (!chatId) return [];
      const { data } = await edgeApi.get(
        `/edgeagent-playground/playground_edgebot/chat/${chatId}/chat_history`,
      );
      return data.result || [];
    },
    enabled: !!chatId,
    select: mapChatHistory,
    staleTime: 60000,
  });
};

export const useSendChatMessage = () => {
  return useMutation<
    ChatHistoryResponse,
    AxiosError<ApiError>,
    { chatId: string | number; messageText: string }
  >({
    mutationFn: async ({ chatId, messageText }) => {
      const { data } = await edgeApi.post(
        `/edgeagent-playground/playground_edgebot/chat/${chatId}/chat_history`,
        { human: messageText },
      );
      return data;
    },
  });
};

export const useClearChats = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      await edgeApi.delete("/edgeagent-playground/playground_edgebot/chat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.chats.all,
      });
    },
  });
};
