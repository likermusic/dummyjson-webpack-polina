import axios from "axios";

import { API_BASE_URL } from "@/shared/api/baseUrl";
import type { AuthCredentials, AuthResponse } from "../types/types";

export const login = async (credentials: AuthCredentials) => {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/login`,
    credentials,
  );
  return response.data;
};
