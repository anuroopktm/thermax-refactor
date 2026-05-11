import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { Member, MemberWithCount } from "./types";
import { type MemberForm } from "@/validations/members.schema";
import { mapTbwesMembersResponse } from "@/pages/tbwes-ocr/lib/tbwes-mappers";

export const useTbwesMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  role?: string | null;
}) => {
  return useQuery({
    queryKey: ["tbwes-ocr", "members", params],
    queryFn: async () => {
      const { data } = await tbwesApi.get<MemberWithCount>(
        "/api/tbwes_ocr/member",
        { params },
      );
      return data;
    },
    select: mapTbwesMembersResponse,
  });
};

export const useTbwesCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await tbwesApi.post("/api/tbwes_ocr/member", null, {
        params: member,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "members"] });
    },
  });
};

export const useTbwesUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      const { data } = await tbwesApi.patch(
        `/api/tbwes_ocr/member/${id}`,
        null,
        {
          params: updateData,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "members"] });
    },
  });
};

export const useTbwesDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await tbwesApi.delete(`/api/tbwes_ocr/member/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "members"] });
    },
  });
};

export const useTbwesCurrentMember = () => {
  return useQuery<Member, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "members", "me"],
    queryFn: async () => {
      const { data } = await tbwesApi.get<Member>("/api/tbwes_ocr/member/me");
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};
