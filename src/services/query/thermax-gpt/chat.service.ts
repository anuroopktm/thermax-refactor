import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gptApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ChatResponse,
  ChatHistoryItem,
  ChatHistoryResponse,
  ChatItem,
  ChatCreateResponse,
  ChatUpdatePayload,
  CreateChatHistoryPayload,
  NormalizedMessage,
  ChatCreatePayload,
} from "./types";
import { normalizeHistoryMessages } from "@/pages/thermax-gpt/lib/chat-mappers";
import { thermaxGptKeys } from "./keys";

interface StreamCallbacks {
  onStart?: () => void;
  onChunk?: (chunk: string, fullText: string) => void;
  onEnd?: (fullText: string) => void;
  onError?: (error: AxiosError | Error) => void;
}

export const useThermaxGptChat = ({
  skip = 0,
  limit = 100,
  search_term,
}: {
  skip?: number;
  limit?: number;
  search_term?: string;
} = {}) => {
  return useQuery<ChatResponse, AxiosError<ApiError>, ChatItem[]>({
    queryKey: thermaxGptKeys.chat.list({ skip, limit, search_term }),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/chat", {
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

export const useThermaxGptChatMessages = (
  chatId?: string,
  skip = 0,
  limit = 100,
) => {
  return useQuery<
    ChatHistoryResponse,
    AxiosError<ApiError>,
    NormalizedMessage[]
  >({
    queryKey: thermaxGptKeys.chat.messages(chatId),
    queryFn: async () => {
      const { data } = await gptApi.get(
        `/thermax_gpt/chat/${chatId}/chat_history`,
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

export const useThermaxGptCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ChatCreateResponse,
    AxiosError<ApiError>,
    ChatCreatePayload
  >({
    mutationFn: async (input) => {
      const { data } = await gptApi.post("/thermax_gpt/chat/", input);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: thermaxGptKeys.chat.list(),
      });
    },
  });
};

export const useThermaxGptUpdateChat = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiError>,
    { chatId: string | number; payload: ChatUpdatePayload }
  >({
    mutationFn: async ({ chatId, payload }) => {
      await gptApi.patch(`/thermax_gpt/chat/${chatId}`, null, {
        params: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: thermaxGptKeys.chat.list(),
      });
    },
  });
};

export const useThermaxGptDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (chatId) => {
      await gptApi.delete(`/thermax_gpt/chat/${chatId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: thermaxGptKeys.chat.list(),
      });
    },
  });
};

export const useThermaxGptClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      await gptApi.delete("/thermax_gpt/chat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: thermaxGptKeys.chat.list(),
      });
    },
  });
};

export const useThermaxGptCreateChatHistory = () => {
  return useMutation<
    ChatHistoryItem,
    AxiosError<ApiError>,
    CreateChatHistoryPayload
  >({
    mutationFn: async ({ chatId, human, files, thinking, model }) => {
      const formData = new FormData();

      formData.append("human", human);
      formData.append("thinking", String(thinking));
      formData.append("model", model);

      if (files) {
        files.forEach((file) => formData.append("files", file));
      }

      const { data } = await gptApi.post(
        `/thermax_gpt/chat/${chatId}/chat_history/`,
        formData,
      );

      return data;
    },
  });
};

export const useThermaxGptChatHistoryStream = async (
  chatId: string,
  chatHistoryId: string | number,
  model: string,
  thinking: boolean,
  callbacks?: StreamCallbacks,
) => {
  const { onStart, onChunk, onEnd, onError } = callbacks || {};
  try {
    onStart?.();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_SERVICE_THERMAX_GPT_URL}/thermax_gpt/chat/${chatId}/chat_history/stream?chat_history_id=${chatHistoryId}&model=${model}&thinking=${thinking}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          Accept: "text/event-stream",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Stream request failed: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Readable stream not supported");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const event of events) {
        const lines = event.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          const jsonStr = line.slice(5).trim();

          if (!jsonStr) continue;

          const parsed = JSON.parse(jsonStr);

          if (parsed.type === "text") {
            fullText += parsed.content;
            onChunk?.(parsed.content, fullText);
          }

          if (parsed.type === "end") {
            onEnd?.(fullText);
            return fullText;
          }
        }
      }
    }

    onEnd?.(fullText);

    return fullText;
  } catch (error) {
    onError?.(error as AxiosError);

    throw error;
  }
};
