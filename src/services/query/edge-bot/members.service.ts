import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { type MemberForm } from "@/lib/validations/members.schema";
import { normalizeEdgeMembers } from "@/pages/edge-bot/lib/edge-mappers";
import { edgeApi } from "@/services/interceptor";

import type { ApiError } from "../../api.types";
import { edgeBotKeys } from "./keys";
import { type Member } from "./types";

export const useMembers = () => {
  return useQuery<Member[], AxiosError<ApiError>, Member[]>({
    queryKey: edgeBotKeys.members.list(),
    queryFn: async () => {
      const { data } = await edgeApi.get("/edgeagent-playground/member");

      return data.result;
    },
    select: normalizeEdgeMembers,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await edgeApi.post("/edgeagent-playground/member", null, {
        params: {
          role: member.role,
          email: member.email,
          name: member.name,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.members.all,
      });
    },
  });
};

export const useUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await edgeApi.patch(`/edgeagent-playground/member/${id}`, null, {
        params: {
          name: member.name,
          role: member.role,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.members.all,
      });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await edgeApi.delete(`/edgeagent-playground/member/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.members.all,
      });
    },
  });
};
