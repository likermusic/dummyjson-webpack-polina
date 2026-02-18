import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { isAuthenticated } from "@/shared/lib/auth";

type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: isAuthenticated(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state) {
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.isAuthenticated = false;
    },
    setAuthState(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { signIn, signOut, setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
