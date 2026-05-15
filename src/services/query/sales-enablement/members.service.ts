import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { MemberForm } from "@/pages/sales-enablement-tool/settings/validations/members.schema";
import type {
  Member,
  CreateMemberResponse,
  UpdateMemberResponse,
  DeleteMemberResponse,
} from "./types";

export const useMembers = () => {
  return useQuery<Member[], AxiosError<ApiError>>({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await salesApi.get<Member[]>("/members");
      return data;
    },
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateMemberResponse, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await salesApi.post<CreateMemberResponse>(
        "/members",
        member,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};

export const useUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateMemberResponse, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await salesApi.post<UpdateMemberResponse>(
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
  return useMutation<
    DeleteMemberResponse,
    AxiosError<ApiError>,
    string | number
  >({
    mutationFn: async (id: string | number) => {
      const { data } = await salesApi.post<DeleteMemberResponse>(
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
