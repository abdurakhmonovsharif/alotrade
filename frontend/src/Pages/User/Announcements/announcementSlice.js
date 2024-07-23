import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Config/Api";
import { universalToast } from "../../../Components/ToastMessages/ToastMessages";
import { findIndex } from "lodash";
import { useTranslation as t } from "react-i18next";
import store from "../../../Config/store";
import { addFavoriteToUser } from "../../Sign/signSlice";

// export const createProduct = createAsyncThunk(
//   "anns/createProduct",
//   async (body = {}, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/product/create", body);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const getAnns = createAsyncThunk(
  "anns/getAnns",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(
        "/announcement/post/get/getByFilter",
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getForYouAnns = createAsyncThunk(
  "anns/getAnnsForYou",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/announcement/post/foruser", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAnnsCount = createAsyncThunk(
  "anns/getAnnsCount",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(
        "/announcement/post/get/getByFilter",
        body,
        {
          params: { isCount: true },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const getProductsByFilter = createAsyncThunk(
//   "anns/getProductsByFilter",
//   async (body = {}, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/product/getbyfilter", body);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const getAnnById = createAsyncThunk(
  "anns/getAnnById",
  async (body = {}, { rejectWithValue }) => {
    const token = localStorage.getItem("_grecaptcha");
    try {
      const { data } = await Api.get(
        token
          ? `/announcement/post/get/${body.id}`
          : `/announcement/post/${body.id}`,
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const getProductByOffer = createAsyncThunk(
//   "anns/getProductsByOffer",
//   async (body = {}, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/product/getbyoffer", body);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const updateProduct = createAsyncThunk(
//   "anns/updateProduct",
//   async (body = {}, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.put("/product/update", body);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const updateProductPosition = createAsyncThunk(
//   "anns/updateProductPosition",
//   async (body = {}, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.put("/product/updateposition", body);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const deleteAnn = createAsyncThunk(
  "anns/deleteAnn",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete(`/announcement/post/${body.id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "anns/addFavorites",
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
  "anns/getFavorites",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/favorite/getPosts", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "anns/deleteFavorite",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/favorite/deletePosts", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const annSlice = createSlice({
  name: "anns",
  initialState: {
    anns: null,
    totalDatas: 0,
    favorites: [],
    ann: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrorAnns: (state) => {
      state.error = null;
    },
    clearAnnsData: (state) => {
      state.anns = null;
    },
  },
  extraReducers: {
    // [createProduct.pending]: (state) => {
    //   state.loading = true;
    // },
    // [createProduct.fulfilled]: (state, { payload: { product } }) => {
    //   state.loading = false;
    //   state.products = [product, ...state.products];
    // },
    // [createProduct.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    //   universalToast(payload, "error");
    // },
    [getAnns.pending]: (state) => {
      state.loading = true;
    },
    [getAnns.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.anns = payload;
    },
    [getAnns.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },

    [getForYouAnns.pending]: (state) => {
      state.loading = true;
    },
    [getForYouAnns.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.anns = payload?.data;
      state.totalDatas = payload?.totalCount;
    },
    [getForYouAnns.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    //     [getProductsByFilter.pending]: (state) => {
    //       state.loading = true;
    //     },
    //     [getProductsByFilter.fulfilled]: (state, { payload: { products } }) => {
    //       state.loading = false;
    //       state.products = products;
    //     },
    //     [getProductsByFilter.rejected]: (state, { payload }) => {
    //       state.loading = false;
    //       state.error = payload;
    //       universalToast(payload, "error");
    //     },
    [getAnnById.pending]: (state) => {
      state.loading = true;
    },
    [getAnnById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ann = payload;
    },
    [getAnnById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    //     [updateProduct.pending]: (state) => {
    //       state.loading = true;
    //     },
    //     [updateProduct.fulfilled]: (state, { payload: { product } }) => {
    //       const productIndex = findIndex(state.products, { _id: product._id });
    //       state.products[productIndex] = product;
    //       state.loading = false;
    //     },
    //     [updateProduct.rejected]: (state, { payload }) => {
    //       state.loading = false;
    //       state.error = payload;
    //       universalToast(payload, "error");
    //     },
    [deleteAnn.pending]: (state) => {
      state.loading = true;
    },
    [deleteAnn.fulfilled]: (state, { payload: { id } }) => {
      state.loading = false;
      state.anns = [...state.anns].filter((item) => item._id !== id);
    },
    //     [updateProductPosition.pending]: (state) => {
    //       state.loading = true;
    //     },
    //     [updateProductPosition.fulfilled]: (state, { payload: { product } }) => {
    //       const productIndex = findIndex(state.products, { _id: product._id });
    //       state.products[productIndex] = product;
    //       state.loading = false;
    //     },
    //     [updateProductPosition.rejected]: (state, { payload }) => {
    //       state.loading = false;
    //       state.error = payload;
    //       universalToast(payload, "error");
    //     },
    //     [getProductByOffer.pending]: (state) => {
    //       state.loading = true;
    //     },
    //     [getProductByOffer.fulfilled]: (state, { payload: { product } }) => {
    //       state.loading = false;
    //     },
    //     [getProductByOffer.rejected]: (state, { payload }) => {
    //       state.loading = false;
    //       state.error = payload;
    //       universalToast(payload, "error");
    //     },
    [addFavorite.pending]: (state) => {
      // state.loading = true;
    },
    [addFavorite.fulfilled]: (state, { payload: { userId, postId } }) => {
      // state.loading = false;
      state.anns = [...state.anns].map((ann) => {
        if (ann._id === postId) {
          ann.favorites = ann.favorites ? [...ann.favorites, userId] : [userId];
        }
        return ann;
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
      state.anns = payload?.data;
      state.totalDatas = payload?.totalCount;
    },
    [getFavorites.rejected]: (state, { payload }) => {
      state.loading = false;
      universalToast(payload, "error");
    },
    [deleteFavorite.pending]: (state) => {
      // state.loading = true;
    },
    [deleteFavorite.fulfilled]: (state, { payload: { userId, postId } }) => {
      // state.loading = false;
      state.anns = [...state.anns].map((ann) => {
        if (ann._id === postId) {
          ann.favorites = [...ann.favorites].filter((fav) => fav !== userId);
        }
        return ann;
      });
    },
    [deleteFavorite.rejected]: (state, { payload }) => {
      // state.loading = false;
      universalToast(payload, "error");
    },
  },
});

export const { clearErrorAnns, clearAnnsData, updateMainAnns } =
  annSlice.actions;
export default annSlice.reducer;
