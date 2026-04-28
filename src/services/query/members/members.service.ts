import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { MemberForm } from "@/validations/members.schema";
import type {
  Member,
  CreateMemberResponse,
  UpdateMemberResponse,
  DeleteMemberResponse,
} from "./members.types";

export const useMembers = () => {
  return useQuery<Member[], AxiosError<ApiError>>({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await api.get<Member[]>("/members");
      return data;
    },
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateMemberResponse, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await api.post<CreateMemberResponse>("/members", member);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};

export const useUpdateMember = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateMemberResponse, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await api.post<UpdateMemberResponse>(
        `/members/${id}`,
        member,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteMemberResponse, AxiosError<ApiError>, string>({
    mutationFn: async (id: string) => {
      const { data } = await api.post<DeleteMemberResponse>(
        `/members/${id}/delete`,
        {},
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};
