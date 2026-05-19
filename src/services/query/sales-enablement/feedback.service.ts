import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { salesEnablementKeys } from "./keys";
import { mapFeedbacksList } from "@/pages/sales-enablement-tool/lib/sales-mappers";
import type { ChatFeedbackResponse, ChatFeedbackStatus } from "./types";

export const useFeedbacks = (status?: ChatFeedbackStatus) => {
  return useQuery<ChatFeedbackResponse[], AxiosError<ApiError>, unknown[]>({
    queryKey: salesEnablementKeys.feedback.list(
      status ? { status } : undefined,
    ),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/feedback", {
        params: {
          limit: 100,
          ...(status ? { status } : {}),
        },
      });
      return data.result;
    },
    select: mapFeedbacksList,
  });
};

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    AxiosError<ApiError>,
    { id: number; question: string; answer: string; status: string }
  >({
    mutationFn: async ({ id, question, answer, status }) => {
      const mapStatusToApi = (s: string) => {
        switch (s) {
          case "Not Specified":
            return "NOT_REVIEWED";
          case "in-review":
            return "IN_REVIEW";
          case "approved":
            return "APPROVED";
          case "rejected":
            return "REJECTED";
          default:
            return s;
        }
      };

      await salesApi.patch(
        `/sales/feedback/${id}`,
        {},
        {
          params: {
            updated_question: question,
            updated_answer: answer,
            status: mapStatusToApi(status),
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.feedback.all,
      });
    },
  });
};
