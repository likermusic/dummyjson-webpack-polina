import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";

import { authReducer } from "@/components/auth-form/model/authSlice";
import { productsReducer } from "@/components/products-list/model/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
