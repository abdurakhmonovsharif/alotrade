import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Config/Api";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/category/get");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSubcategories = createAsyncThunk(
  "category/getSubcategories",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(
        "category/subcategories/getbycategory",
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categoriesWithSubcategories: null,
    loading: false,
    error: null,
    subcategories: null,
  },
  reducers: {
    clearErrorCategories: (state) => {
      state.error = null;
    },
    clearSubcategories: (state) => {
      state.subcategories = null;
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.loading = true;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categoriesWithSubcategories = payload;
    },
    [getAllCategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getSubcategories.pending]: (state) => {
      state.loading = true;
    },
    [getSubcategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subcategories = payload.map((el) => ({
        _id: el.value,
        name: el.label,
        ...el,
      }));
    },
    [getSubcategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearErrorCategories, clearSubcategories } =
  categorySlice.actions;
export default categorySlice.reducer;
