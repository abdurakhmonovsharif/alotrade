import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Config/Api";

export const getAllregions = createAsyncThunk(
  "regions/getAllRegions",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/address/region/getall");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    regions: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getAllregions.pending]: (state) => {
      state.loading = true;
    },
    [getAllregions.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.regions = payload;
    },
    [getAllregions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearError } = regionsSlice.actions;
export default regionsSlice.reducer;
