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

interface StreamCallbacks {
  onStart?: () => void;
  onChunk?: (chunk: string, fullText: string) => void;
  onEnd?: (fullText: string) => void;
  onError?: (error: AxiosError | Error) => void;
}

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
    staleTime: 60000,
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
      const { data } = await conbotApi.post("/doctor_conbot/chat", input);

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

export const useDrConbotChatHistoryStream = async (
  chatId: string,
  model: string,
  thinking: boolean,
  human: string,
  callbacks?: StreamCallbacks,
) => {
  const { onStart, onChunk, onEnd, onError } = callbacks || {};
  try {
    onStart?.();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_SERVICE_DOCTOR_CONBOT_URL}/doctor_conbot/chat/${chatId}/agent/?model=${model}&thinking=${thinking}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ human }),
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
