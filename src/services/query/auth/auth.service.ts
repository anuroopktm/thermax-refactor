import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { SignInFormValues } from "@/pages/sign-in/validations/sign-in.schema";
import type { SignInResponse, UserMeResponse } from "./auth.types";

export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, SignInFormValues>({
    mutationFn: async (user: SignInFormValues) => {
      const params = new URLSearchParams();
      params.append("username", user.email);
      params.append("password", user.password);

      const { data } = await api.post("/login/access-token", params);

      return data;
    },

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export const useAuthUrl = () => {
  return useMutation<string, AxiosError<ApiError>>({
    mutationFn: async () => {
      const { data } = await api.get("/microsoft/login", {
        params: { redirect: "/ai-studio" },
      });

      return data;
    },
  });
};

export const useExchangeCode = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, string>({
    mutationFn: async (params: string) => {
      const { data } = await api.get(`/login/access-token?${params}`);

      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export const useMe = () => {
  return useQuery<UserMeResponse, AxiosError<ApiError>>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await api.get("/user/me/");

      return data;
    },
  });
};
