import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";

export const createDistrict = createAsyncThunk(
  "districts/createDistrict",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/address/region/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDistricts = createAsyncThunk(
  "districts/Districts",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/address/region/getall");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDistrict = createAsyncThunk(
  "districts/updateDistrict",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/address/region/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDistrict = createAsyncThunk(
  "region/deleteDistrict",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete("/address/region/delete", {
        data: body,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    districts: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrorDistricts: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getDistricts.pending]: (state) => {
      state.loading = true;
    },
    [getDistricts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.districts = payload;
    },
    [getDistricts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [createDistrict.pending]: (state) => {
      state.loading = true;
    },
    [createDistrict.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.districts = [payload, ...state.districts];
    },
    [createDistrict.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateDistrict.pending]: (state) => {
      state.loading = true;
    },
    [updateDistrict.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.districts.findIndex(
        (item) => item._id === payload._id
      );
      state.districts[index] = payload;
    },
    [updateDistrict.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteDistrict.pending]: (state) => {
      state.loading = true;
    },
    [deleteDistrict.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.districts = state.districts.filter((el) => el._id != payload._id);
    },
    [deleteDistrict.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearErrorDistricts } = districtsSlice.actions;
export default districtsSlice.reducer;
