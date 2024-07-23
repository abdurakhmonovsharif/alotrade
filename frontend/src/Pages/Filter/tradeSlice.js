import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Config/Api";

export const getTradeTypes = createAsyncThunk(
  "trade/getTradeTypes",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/trade/tradetype/get");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tradeSlice = createSlice({
  name: "trade",
  initialState: {
    tradetypes: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getTradeTypes.pending]: (state) => {
      state.loading = true;
    },
    [getTradeTypes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tradetypes = payload;
    },
    [getTradeTypes.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearError } = tradeSlice.actions;
export default tradeSlice.reducer;
