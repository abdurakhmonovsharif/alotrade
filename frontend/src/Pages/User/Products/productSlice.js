import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Config/Api";
import { universalToast } from "../../../Components/ToastMessages/ToastMessages";
import { findIndex } from "lodash";
import { useTranslation as t } from "react-i18next";
import store from "../../../Config/store";
import { addFavoriteToUser } from "../../Sign/signSlice";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/getbyfilter", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductsCount = createAsyncThunk(
  "products/getProductsCount",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/getbyfiltercount", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductsByFilter = createAsyncThunk(
  "products/getProductsByFilter",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/getbyfilter", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductsById",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/getbyid", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductByOffer = createAsyncThunk(
  "products/getProductsByOffer",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/getbyoffer", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/product/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProductPosition = createAsyncThunk(
  "products/updateProductPosition",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/product/updateposition", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/product/delete", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "products/addFavorites",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/favorite/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFavorites = createAsyncThunk(
  "products/getFavorites",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/favorite/get", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "products/deleteFavorite",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/favorite/delete", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    favorites: [],
    product: null,
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {
    clearErrorCategories: (state) => {
      state.error = null;
    },
    clearProductData: (state) => {
      state.product = null;
    },
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, { payload: { product } }) => {
      state.loading = false;
      state.products = [product, ...state.products];
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload: { products } }) => {
      state.loading = false;
      state.products = products;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getProductsByFilter.pending]: (state) => {
      state.loading = true;
    },
    [getProductsByFilter.fulfilled]: (state, { payload: { products } }) => {
      state.loading = false;
      state.products = products;
    },
    [getProductsByFilter.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getProductById.pending]: (state) => {
      state.loading = true;
    },
    [getProductById.fulfilled]: (state, { payload: { product } }) => {
      state.loading = false;
      state.product = product;
    },
    [getProductById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, { payload: { product } }) => {
      const productIndex = findIndex(state.products, { _id: product._id });
      state.products[productIndex] = product;
      state.loading = false;
    },
    [updateProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload: { id } }) => {
      state.loading = false;
      state.products = [...state.products].filter((item) => item._id !== id);
    },
    [updateProductPosition.pending]: (state) => {
      state.loading = true;
    },
    [updateProductPosition.fulfilled]: (state, { payload: { product } }) => {
      const productIndex = findIndex(state.products, { _id: product._id });
      state.products[productIndex] = product;
      state.loading = false;
    },
    [updateProductPosition.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getProductByOffer.pending]: (state) => {
      state.loading = true;
    },
    [getProductByOffer.fulfilled]: (state, { payload: { product } }) => {
      state.loading = false;
    },
    [getProductByOffer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [addFavorite.pending]: (state) => {
      // state.loading = true;
    },
    [addFavorite.fulfilled]: (state, { payload: { userId, productId } }) => {
      // state.loading = false;

      state.products = [...state.products].map((product) => {
        if (product._id === productId) {
          product.favorites = product.favorites
            ? [...product.favorites, userId]
            : [userId];
        }
        return product;
      });
    },
    [addFavorite.rejected]: (state, { payload }) => {
      // state.loading = false;
      universalToast(payload, "error");
    },
    [getFavorites.pending]: (state) => {
      state.loading = true;
    },
    [getFavorites.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload?.data;
      state.totalCount = payload?.totalCount;
    },
    [getFavorites.rejected]: (state, { payload }) => {
      state.loading = false;
      universalToast(payload, "error");
    },
    [deleteFavorite.pending]: (state) => {
      // state.loading = true;
    },
    [deleteFavorite.fulfilled]: (state, { payload: { userId, productId } }) => {
      // state.loading = false;
      state.products = [...state.products].map((product) => {
        if (product._id === productId) {
          product.favorites = [...product.favorites].filter(
            (fav) => fav !== userId
          );
        }
        return product;
      });
    },
    [deleteFavorite.rejected]: (state, { payload }) => {
      // state.loading = false;
      universalToast(payload, "error");
    },
  },
});

export const { clearErrorCategories, clearProductData } = productSlice.actions;
export default productSlice.reducer;
