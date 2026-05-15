import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  DrConbotMember,
  DrConbotMembersResponse,
  CreateDrConbotMemberPayload,
  UpdateDrConbotMemberPayload,
} from "./types";

import { normalizeDrConbotMembers } from "@/pages/dr-conbot/lib/settings-mappers";
import { type Member } from "@/services/query/sales-enablement/types/members.types";

export const useDrConbotMembers = (
  skip = 0,
  limit = 100,
  searchTerm?: string,
) => {
  return useQuery<DrConbotMembersResponse, AxiosError<ApiError>, Member[]>({
    queryKey: ["dr-conbot", "members", skip, limit, searchTerm],
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/member", {
        params: { skip, limit, search_term: searchTerm },
      });

      return data;
    },
    select: (data) => normalizeDrConbotMembers(data.result),
  });
};

export const useDrConbotMe = () => {
  return useQuery<DrConbotMember, AxiosError<ApiError>>({
    queryKey: ["dr-conbot", "members", "me"],
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/member/me");

      return data;
    },
  });
};

export const useCreateDrConbotMember = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotMember,
    AxiosError<ApiError>,
    CreateDrConbotMemberPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.post("/doctor_conbot/member", payload);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dr-conbot", "members"] });
    },
  });
};

export const useUpdateDrConbotMember = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotMember,
    AxiosError<ApiError>,
    UpdateDrConbotMemberPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.patch(
        `/doctor_conbot/member/${memberId}`,
        payload,
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dr-conbot", "members"] });
    },
  });
};

export const useDeleteDrConbotMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (memberId) => {
      await conbotApi.delete(`/doctor_conbot/member/${memberId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dr-conbot", "members"] });
    },
  });
};
