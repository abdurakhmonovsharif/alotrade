import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";

export const getAllAdminProducts = createAsyncThunk(
  "adminProducts/getAll",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/getbyfilter", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/delete", { id: body._id });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllAdminProducts.pending]: (state) => {
      state.loading = true;
    },
    [getAllAdminProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload.products;
    },
    [getAllAdminProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload: { id } }) => {
      state.loading = false;
      state.products = [...state.products].filter((item) => item._id !== id);
    },
  },
});

export default adminProductsSlice.reducer;
