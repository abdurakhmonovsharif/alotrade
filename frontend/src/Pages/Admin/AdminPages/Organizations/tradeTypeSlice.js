import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";

export const getAllTradeTypes = createAsyncThunk(
  "tradeTypes/getAll",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/trade/tradetype/get");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTradeType = createAsyncThunk(
  "tradeTypes/createTradeType",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/trade/tradetype/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTradeType = createAsyncThunk(
  "tradeTypes/updateTradeType",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put(`/trade/tradetype/update`, body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTradeType = createAsyncThunk(
  "tradeTypes/deleteTradeType",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete(`/trade/tradeType/delete`, {
        data: body,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tradeTypesSlice = createSlice({
  name: "tradeTypes",
  initialState: {
    tradeTypes: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllTradeTypes.pending]: (state) => {
      state.loading = true;
    },
    [getAllTradeTypes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tradeTypes = payload;
    },
    [getAllTradeTypes.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [createTradeType.pending]: (state) => {
      state.loading = true;
    },
    [createTradeType.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tradeTypes = [payload, ...state.tradeTypes];
    },
    [createTradeType.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateTradeType.pending]: (state) => {
      state.loading = true;
    },
    [updateTradeType.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.tradeTypes.findIndex(
        (item) => item._id === payload._id
      );
      state.tradeTypes[index] = payload;
    },
    [updateTradeType.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteTradeType.pending]: (state) => {
      state.loading = true;
    },
    [deleteTradeType.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tradeTypes = state.tradeTypes.filter((el) => el._id != payload._id);
    },
    [deleteTradeType.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default tradeTypesSlice.reducer;
