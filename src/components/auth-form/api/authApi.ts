import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { baseApi } from "@/shared/api/baseApi";
import { setAccessToken, signIn, signOut } from "../model/authSlice";
import type {
  AuthCredentials,
  AuthLoginResponse,
  AuthMeResponse,
  AuthRefreshResponse,
} from "../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthLoginResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            signIn({
              accessToken: data.accessToken ?? null,
              refreshToken: data.refreshToken ?? null,
            }),
          );
        } catch {
          dispatch(signOut());
        }
      },
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<AuthMeResponse, void>({
      async queryFn(_, api, __, baseQuery) {
        const meResult = await baseQuery("/auth/me");

        if (meResult.error?.status !== 401) {
          return meResult.data
            ? { data: meResult.data as AuthMeResponse }
            : { error: meResult.error as FetchBaseQueryError };
        }

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          api.dispatch(signOut());
          return { error: meResult.error as FetchBaseQueryError };
        }

        const refreshResult = await baseQuery({
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        });

        if (refreshResult.data) {
          const tokens = refreshResult.data as AuthRefreshResponse;

          api.dispatch(setAccessToken(tokens.accessToken));
          if (tokens.refreshToken) {
            localStorage.setItem("refreshToken", tokens.refreshToken);
          }

          const retryResult = await baseQuery("/auth/me");

          return retryResult.data
            ? { data: retryResult.data as AuthMeResponse }
            : { error: retryResult.error as FetchBaseQueryError };
        }

        api.dispatch(signOut());

        return {
          error:
            (refreshResult.error as FetchBaseQueryError | undefined) ??
            (meResult.error as FetchBaseQueryError),
        };
      },
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
