import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
};

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
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken) {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem("refreshToken");
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
  },
});

export const { signIn, signOut, setAccessToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
