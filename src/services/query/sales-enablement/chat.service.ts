import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { salesEnablementKeys } from "./keys";
import {
  mapChats,
  mapChatHistory,
} from "@/pages/sales-enablement-tool/lib/sales-mappers";
import type {
  ChatResponse,
  ChatHistoryResponse,
  SimilarQuestionResponse,
} from "./types";
import {
  type Chat,
  type NormalizedMessage,
} from "@/components/shared/chat/types";

export const useChats = () => {
  return useQuery<ChatResponse[], AxiosError<ApiError>, Chat[]>({
    queryKey: salesEnablementKeys.chats.all,
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/chat");
      return data.result;
    },
    select: mapChats,
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation<ChatResponse, AxiosError<ApiError>, string>({
    mutationFn: async (title: string) => {
      const { data } = await salesApi.post("/sales/chat", null, {
        params: { title },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.all,
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
      const { data } = await salesApi.patch(`/sales/chat/${chatId}`, null, {
        params: { title },
      });
      return data;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.all,
      });
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.detail(chatId),
      });
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await salesApi.delete(`/sales/chat/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.all,
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
    queryKey: salesEnablementKeys.chats.history(chatId || ""),
    queryFn: async () => {
      if (!chatId) return [];
      const { data } = await salesApi.get(`/sales/chat/${chatId}/chat_history`);
      return data.result || [];
    },
    enabled: !!chatId,
    select: mapChatHistory,
  });
};

export const useSendChatMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ChatHistoryResponse,
    AxiosError<ApiError>,
    { chatId: string | number; messageText: string }
  >({
    mutationFn: async ({ chatId, messageText }) => {
      const { data } = await salesApi.post(
        `/sales/chat/${chatId}/chat_history`,
        { human: messageText },
      );
      return data;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.history(chatId),
      });
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.all,
      });
    },
  });
};

export const useClearChats = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      await salesApi.delete("/sales/chat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.chats.all,
      });
    },
  });
};

export const useSimilarQuestions = (question: string) => {
  return useQuery<SimilarQuestionResponse[], AxiosError<ApiError>, string[]>({
    queryKey: ["sales-enablement", "similar-questions", question],
    queryFn: async () => {
      if (!question) return [];
      const { data } = await salesApi.get("/sales/similar_question", {
        params: { question },
      });
      return data.result;
    },
    enabled: !!question,
    select: (data) => data.map((item) => item.question),
  });
};
