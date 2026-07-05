import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { AuthCredentials, AuthLoginResponse } from "../types";

type AuthState = {
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  status: "idle",
  error: null,
};

export const signInByCredentials = createAsyncThunk<
  AuthLoginResponse,
  AuthCredentials,
  { rejectValue: string }
>("auth/signInByCredentials", async (credentials, { rejectWithValue }) => {
  try {
    const { login } = await import("../api/authApi");
    return await login(credentials);
  } catch {
    return rejectWithValue("Invalid username or password");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.status = "succeeded";
      state.error = null;
      if (action.payload.refreshToken) {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    signOut(state) {
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("refreshToken");
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInByCredentials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInByCredentials.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken ?? null;
        state.status = "succeeded";
        state.error = null;
        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      })
      .addCase(signInByCredentials.rejected, (state, action) => {
        state.accessToken = null;
        state.status = "failed";
        state.error = action.payload ?? "Invalid username or password";
      });
  },
});

export const { signIn, signOut, setAccessToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
