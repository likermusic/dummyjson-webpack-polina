import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "./baseUrl";

type AuthState = {
  auth?: {
    accessToken: string | null;
  };
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as AuthState).auth?.accessToken;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Product"],
  endpoints: () => ({}),
});
