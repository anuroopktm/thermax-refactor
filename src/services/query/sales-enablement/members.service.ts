import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { MemberForm } from "@/lib/validations/members.schema";
import type { Member, SalesMember } from "./types";
import { normalizeSalesMembers } from "@/pages/sales-enablement-tool/lib/sales-mappers";
import { salesEnablementKeys } from "./keys";

export const useMembers = () => {
  return useQuery<SalesMember[], AxiosError<ApiError>, Member[]>({
    queryKey: salesEnablementKeys.members.list(),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/member");
      return data.result;
    },
    select: normalizeSalesMembers,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await salesApi.post("/sales/member", null, {
        params: {
          role: member.role,
          email: member.email,
          name: member.name,
        },
      });
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
      await salesApi.patch(`/sales/member/${id}`, null, {
        params: {
          name: member.name,
          role: member.role,
        },
      });
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
      await salesApi.delete(`/sales/member/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.members.all,
      });
    },
  });
};
