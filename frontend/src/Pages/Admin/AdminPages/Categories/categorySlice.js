import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";

export const getAllCategoriesAdmin = createAsyncThunk(
  "category/getAllCategoriesAdmin",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/category/get");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCategoryAdmin = createAsyncThunk(
  "category/createCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/category/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSubCategoryAdmin = createAsyncThunk(
  "category/createSubCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/category/subcategory/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSubCategoryAdmin = createAsyncThunk(
  "category/updateSubCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/category/subcategory/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeSubCategoryAdmin = createAsyncThunk(
  "category/removeSubCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete(
        `/category/subcategory/remove/${body._id}`,
        { data: body }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSub2CategoryAdmin = createAsyncThunk(
  "category/createSub2CategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/category/subcategory2/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSub2CategoryAdmin = createAsyncThunk(
  "category/updateSubCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/category/subcategory2/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeSub2CategoryAdmin = createAsyncThunk(
  "category/removeSub2CategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete(
        `/category/subcategory2/remove/${body._id}`,
        { data: body }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editCategoryAdmin = createAsyncThunk(
  "category/editCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/category/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategoryAdmin = createAsyncThunk(
  "category/deleteCategoryAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete("/category/delete", { data: body });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState: {
    categoriesWithSubcategories: null,
    loading: false,
    error: null,
    subcategories: null,
    currentCategory: null,
  },
  reducers: {
    clearErrorCategories: (state) => {
      state.error = null;
    },
    clearSubcategories: (state) => {
      state.subcategories = null;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: {
    // ---------------------------------------------------//
    // -------------- CATEGORY ---------------------------//
    // ---------------------------------------------------//
    [getAllCategoriesAdmin.pending]: (state) => {
      state.loading = true;
    },
    [getAllCategoriesAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.categoriesWithSubcategories = payload;
    },
    [getAllCategoriesAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [createCategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [createCategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categoriesWithSubcategories = [
        payload,
        ...state.categoriesWithSubcategories,
      ];
    },
    [createCategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [editCategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [editCategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.categoriesWithSubcategories.findIndex(
        (item) => item._id === payload._id
      );
      state.categoriesWithSubcategories[index] = payload;
    },
    [editCategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteCategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categoriesWithSubcategories =
        state.categoriesWithSubcategories.filter((el) => el._id != payload._id);
    },
    [deleteCategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // ---------------------------------------------------//
    // -------------- SUBCATEGORY  -----------------------//
    // ---------------------------------------------------//

    [createSubCategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [createSubCategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.categoriesWithSubcategories?.findIndex(
        (item) => item._id === payload.category
      );
      state.categoriesWithSubcategories[index].subcategories = [
        payload,
        ...state.categoriesWithSubcategories[index].subcategories,
      ];
    },
    [createSubCategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateSubCategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [updateSubCategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const indexCategory = state.categoriesWithSubcategories.findIndex(
        (item) => item._id === payload.category
      );
      const indexSub = state.categoriesWithSubcategories[
        indexCategory
      ].subcategories.findIndex((item) => item._id === payload._id);
      state.categoriesWithSubcategories[indexCategory].subcategories[indexSub] =
        payload;
    },
    [updateSubCategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [removeSubCategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [removeSubCategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;

      const indexCategory = state.categoriesWithSubcategories.findIndex(
        (item) => item._id === payload.category
      );
      state.categoriesWithSubcategories[indexCategory].subcategories =
        state.categoriesWithSubcategories[indexCategory].subcategories.filter(
          (el) => el._id != payload._id
        );
    },
    [removeSubCategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // ---------------------------------------------------//
    // -------------- SUBCATEGORY 2  -----------------------//
    // ---------------------------------------------------//

    [createSub2CategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [createSub2CategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const categIndex = state.categoriesWithSubcategories.findIndex(
        (item) => item._id == state.currentCategory
      );
      const subindex = state.categoriesWithSubcategories[
        categIndex
      ].subcategories?.findIndex((item) => item._id === payload.subcategory);

      state.categoriesWithSubcategories[categIndex].subcategories[
        subindex
      ].subcategories = [
        payload,
        ...state.categoriesWithSubcategories[categIndex].subcategories[subindex]
          .subcategories,
      ];
    },
    [createSub2CategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateSub2CategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [updateSub2CategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;

      const categIndex = state.categoriesWithSubcategories.findIndex(
        (item) => item._id == state.currentCategory
      );
      const subindex = state.categoriesWithSubcategories[
        categIndex
      ].subcategories?.findIndex((item) => item._id === payload.subcategory);

      const sub2index = state.categoriesWithSubcategories[
        categIndex
      ].subcategories[subindex].subcategories.findIndex(
        (el) => el._id == payload._id
      );

      state.categoriesWithSubcategories[categIndex].subcategories[
        subindex
      ].subcategories[sub2index] = payload;
    },
    [updateSub2CategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [removeSub2CategoryAdmin.pending]: (state) => {
      state.loading = true;
    },
    [removeSub2CategoryAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;

      const categIndex = state.categoriesWithSubcategories.findIndex(
        (item) => item._id == state.currentCategory
      );
      const subindex = state.categoriesWithSubcategories[
        categIndex
      ].subcategories?.findIndex((item) => item._id === payload.subcategory);

      state.categoriesWithSubcategories[categIndex].subcategories[
        subindex
      ].subcategories = state.categoriesWithSubcategories[
        categIndex
      ].subcategories[subindex].subcategories.filter(
        (el) => el._id != payload._id
      );
    },
    [removeSub2CategoryAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearErrorCategories, clearSubcategories, setCurrentCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
