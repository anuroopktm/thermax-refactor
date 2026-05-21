import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ChatResponse,
  ChatHistoryModel,
  ChatHistoryResponse,
  ChatModel,
  ChatCreateResponse,
  ChatUpdatePayload,
  CreateChatHistoryPayload,
  NormalizedMessage,
  ChatCreatePayload,
} from "./types";
import { normalizeHistoryMessages } from "@/pages/dr-conbot/lib/chat-mappers";
import { drConbotKeys } from "./keys";

export const useDrConbotChat = ({
  skip = 0,
  limit = 100,
  search_term,
}: {
  skip?: number;
  limit?: number;
  search_term?: string;
} = {}) => {
  return useQuery<ChatResponse, AxiosError<ApiError>, ChatModel[]>({
    queryKey: drConbotKeys.chat.list({ skip, limit, search_term }),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/chat", {
        params: {
          skip,
          limit,
          search_term,
        },
      });

      return data;
    },
    select: ({ result }) => result,
  });
};

export const useDrConbotChatMessages = (
  chatId?: string,
  skip = 0,
  limit = 100,
) => {
  return useQuery<
    ChatHistoryResponse,
    AxiosError<ApiError>,
    NormalizedMessage[]
  >({
    queryKey: drConbotKeys.chat.messages(chatId),
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/chat/${chatId}/chat_history`,
        {
          params: {
            skip,
            limit,
          },
        },
      );

      return data;
    },
    select: ({ result }) => normalizeHistoryMessages(result),
    enabled: !!chatId,
    staleTime: 60000, // 1 minute to prevent background overwrites during/after streaming
  });
};

export const useDrConbotCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ChatCreateResponse,
    AxiosError<ApiError>,
    ChatCreatePayload
  >({
    mutationFn: async (input) => {
      const { data } = await conbotApi.post("/doctor_conbot/chat/", input);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.chat.list(),
      });
    },
  });
};

export const useDrConbotUpdateChat = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiError>,
    { chatId: string | number; payload: ChatUpdatePayload }
  >({
    mutationFn: async ({ chatId, payload }) => {
      await conbotApi.patch(`/doctor_conbot/chat/${chatId}`, null, {
        params: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.chat.list(),
      });
    },
  });
};

export const useDrConbotDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (chatId) => {
      await conbotApi.delete(`/doctor_conbot/chat/${chatId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.chat.list(),
      });
    },
  });
};

export const useDrConbotClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      await conbotApi.delete("/doctor_conbot/chat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.chat.list(),
      });
    },
  });
};

export const useDrConbotCreateChatHistory = () => {
  return useMutation<
    ChatHistoryModel,
    AxiosError<ApiError>,
    CreateChatHistoryPayload
  >({
    mutationFn: async ({ chatId, human }) => {
      const { data } = await conbotApi.post(
        `/doctor_conbot/chat/${chatId}/chat_history`,
        {
          human,
        },
      );

      return data;
    },
  });
};

export const useDrConbotSendAgentMessage = () => {
  return useMutation<
    ChatHistoryModel,
    AxiosError<ApiError>,
    { chatId: string | number; human: string }
  >({
    mutationFn: async ({ chatId, human }) => {
      const { data } = await conbotApi.post(
        `/doctor_conbot/chat/${chatId}/agent/`,
        { human },
      );
      return data;
    },
  });
};
