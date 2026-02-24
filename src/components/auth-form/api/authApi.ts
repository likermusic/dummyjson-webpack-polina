import { api, protectedApi } from "@/shared/api/client";
import type {
  AuthCredentials,
  AuthLoginResponse,
  AuthMeResponse,
} from "../types";

export const login = async (credentials: AuthCredentials) => {
  const response = await api.post<AuthLoginResponse>("/auth/login", credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await protectedApi.get<AuthMeResponse>("/auth/me");
  return response.data;
};
