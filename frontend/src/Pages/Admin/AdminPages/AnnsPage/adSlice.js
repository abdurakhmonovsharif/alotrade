import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";

export const getAllAds = createAsyncThunk(
  "ads/getAll",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/announcement/type");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAd = createAsyncThunk(
  "ads/createAd",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/announcement/type", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAd = createAsyncThunk(
  "ads/updateAd",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put(`/announcement/type/${body._id}`, body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAd = createAsyncThunk(
  "ads/deleteAd",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete(`/announcement/type/${body._id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllAds.pending]: (state) => {
      state.loading = true;
    },
    [getAllAds.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ads = payload;
    },
    [getAllAds.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [createAd.pending]: (state) => {
      state.loading = true;
    },
    [createAd.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ads = [payload, ...state.ads];
    },
    [createAd.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateAd.pending]: (state) => {
      state.loading = true;
    },
    [updateAd.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.ads.findIndex((item) => item._id === payload._id);
      state.ads[index] = payload;
    },
    [updateAd.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteAd.pending]: (state) => {
      state.loading = true;
    },
    [deleteAd.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ads = state.ads.filter((el) => el._id != payload._id);
    },
    [deleteAd.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default adsSlice.reducer;
