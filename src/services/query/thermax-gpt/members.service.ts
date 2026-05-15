import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gptApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ThermaxMember,
  ThermaxMembersResponse,
  CreateThermaxMemberPayload,
  UpdateThermaxMemberPayload,
} from "./types";

import {
  normalizeThermaxMembers,
  normalizeThermaxMember,
} from "@/pages/thermax-gpt/lib/settings-mappers";
import { type Member } from "@/services/query/shared/types/members.types";
import { thermaxGptKeys } from "./keys";

export const useThermaxMembers = (
  skip = 0,
  limit = 100,
  searchTerm?: string,
) => {
  return useQuery<ThermaxMembersResponse, AxiosError<ApiError>, Member[]>({
    queryKey: thermaxGptKeys.members.list({ skip, limit, searchTerm }),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/member", {
        params: { skip, limit, search_term: searchTerm },
      });

      return data;
    },
    select: (data) => normalizeThermaxMembers(data.result),
  });
};

export const useThermaxMe = () => {
  return useQuery<ThermaxMember, AxiosError<ApiError>, Member>({
    queryKey: thermaxGptKeys.members.me(),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/member/me/");

      return data;
    },
    select: normalizeThermaxMember,
  });
};

export const useCreateThermaxMember = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ThermaxMember,
    AxiosError<ApiError>,
    CreateThermaxMemberPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await gptApi.post("/thermax_gpt/member/", payload);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: thermaxGptKeys.members.all });
    },
  });
};

export const useUpdateThermaxMember = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    ThermaxMember,
    AxiosError<ApiError>,
    UpdateThermaxMemberPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await gptApi.patch(
        `/thermax_gpt/member/${memberId}`,
        payload,
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: thermaxGptKeys.members.all });
    },
  });
};

export const useDeleteThermaxMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (memberId) => {
      await gptApi.delete(`/thermax_gpt/member/${memberId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: thermaxGptKeys.members.all });
    },
  });
};
