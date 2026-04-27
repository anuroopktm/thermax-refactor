import { useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { ChatHistoryItem, SimilarQuestion } from "./chat.types";

export const useChatHistory = () => {
  return useQuery<ChatHistoryItem[], AxiosError<ApiError>>({
    queryKey: ["chat", "history"],
    queryFn: async () => {
      const { data } = await api.get<ChatHistoryItem[]>("/chat/history");
      return data;
    },
  });
};

export const useSimilarQuestions = () => {
  return useQuery<SimilarQuestion[], AxiosError<ApiError>>({
    queryKey: ["chat", "similar-questions"],
    queryFn: async () => {
      const { data } = await api.get<SimilarQuestion[]>(
        "/chat/similar-questions",
      );
      return data;
    },
  });
};
