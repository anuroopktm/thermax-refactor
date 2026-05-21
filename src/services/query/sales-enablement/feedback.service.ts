import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
  mapFeedbacksList,
  type MappedFeedback,
} from "@/pages/sales-enablement-tool/lib/sales-mappers";
import { salesApi } from "@/services/interceptor";

import type { ApiError } from "../../api.types";
import { salesEnablementKeys } from "./keys";
import type { ChatFeedbackResponse } from "./types";

export const useFeedbacks = ({
  skip = 0,
  limit = 100,
  search_term,
}: {
  skip?: number;
  limit?: number;
  search_term?: string;
} = {}) => {
  return useQuery<
    ChatFeedbackResponse[],
    AxiosError<ApiError>,
    MappedFeedback[]
  >({
    queryKey: salesEnablementKeys.feedback.list({ skip, limit, search_term }),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/feedback", {
        params: { skip, limit, search_term },
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
      await salesApi.patch(`/sales/feedback/${id}`, null, {
        params: {
          updated_question: question,
          updated_answer: answer,
          status: status,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.feedback.all,
      });
    },
  });
};
