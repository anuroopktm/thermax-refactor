import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { MemberForm } from "@/lib/validations/members.schema";
import type { Member } from "./types";
import { normalizeSalesMembers } from "@/pages/sales-enablement-tool/lib/sales-mappers";
import { salesEnablementKeys } from "./keys";

export const useMembers = () => {
  return useQuery<Member[], AxiosError<ApiError>, Member[]>({
    queryKey: salesEnablementKeys.members.list(),
    queryFn: async () => {
      const { data } = await salesApi.get("/members");
      return data;
    },
    select: normalizeSalesMembers,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await salesApi.post("/members", member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.members.all,
      });
    },
  });
};

export const useUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await salesApi.post(`/members/${id}`, member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.members.all,
      });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await salesApi.post(`/members/${id}/delete`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.members.all,
      });
    },
  });
};
