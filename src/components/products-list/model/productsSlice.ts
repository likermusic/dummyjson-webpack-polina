import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProductById, getProducts } from "../api/productsApi";
import type { Product } from "../types";
import type { RootState } from "@/app/store";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type ProductsState = {
  items: Product[];
  status: RequestStatus;
  error: string | null;
  selectedItem: Product | null;
  selectedStatus: RequestStatus;
  selectedError: string | null;
};

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  selectedItem: null,
  selectedStatus: "idle",
  selectedError: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await getProducts();
    return data.products;
  } catch {
    return rejectWithValue("Failed to load products. Please try again.");
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    return await getProductById(id);
  } catch {
    return rejectWithValue("Failed to load product. Please try again.");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Failed to load products. Please try again.";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = "loading";
        state.selectedError = null;
        state.selectedItem = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selectedItem = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError =
          action.payload ?? "Failed to load product. Please try again.";
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedItem;
export const selectSelectedProductStatus = (state: RootState) =>
  state.products.selectedStatus;
export const selectSelectedProductError = (state: RootState) =>
  state.products.selectedError;
