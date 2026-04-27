import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { SignInFormValues } from "@/validations/sign-in.schema";
import type { SignInResponse, UserMeResponse } from "./auth.types";

export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, SignInFormValues>({
    mutationFn: async (user: SignInFormValues) => {
      const { data } = await api.post<SignInResponse>("/auth/sign-in", {
        email: user.email,
        password: user.password,
      });
      return data;
    },
  });
};

export const useMe = () => {
  return useQuery<UserMeResponse, AxiosError<ApiError>>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await api.get<UserMeResponse>("/auth/me");
      return response.data;
    },
  });
};
