import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";

export const createRegion = createAsyncThunk(
  "region/createRegion",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/address/region/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllRegions = createAsyncThunk(
  "region/getAllRegions",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/address/region/getall");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRegion = createAsyncThunk(
  "region/updateRegion",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/address/region/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRegion = createAsyncThunk(
  "region/deleteRegion",
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

export const createDistrict = createAsyncThunk(
  "districts/createDistrict",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/address/district/create", body);
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
      const { data } = await Api.get("/address/district/getall");
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
      const { data } = await Api.put("/address/district/update", body);
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
      const { data } = await Api.delete("/address/district/delete", {
        data: body,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const regionsSlice = createSlice({
  name: "region",
  initialState: {
    regions: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrorRegions: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getAllRegions.pending]: (state) => {
      state.loading = true;
    },
    [getAllRegions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.regions = payload;
    },
    [getAllRegions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [createRegion.pending]: (state) => {
      state.loading = true;
    },
    [createRegion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.regions = [payload, ...state.regions];
    },
    [createRegion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateRegion.pending]: (state) => {
      state.loading = true;
    },
    [updateRegion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const index = state.regions.findIndex((item) => item._id === payload._id);
      state.regions[index] = payload;
    },
    [updateRegion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteRegion.pending]: (state) => {
      state.loading = true;
    },
    [deleteRegion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.regions = state.regions.filter((el) => el._id != payload._id);
    },
    [deleteRegion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // ---------------------------------------//
    //--------------DISTRICTS------------------//
    //-----------------------------------------//
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
      const index = state.regions?.findIndex(
        (item) => item._id === payload.region
      );
      state.regions[index].districts = [
        payload,
        ...state.regions[index].districts,
      ];
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
      const indexCategory = state.regions.findIndex(
        (item) => item._id === payload.region
      );
      const indexSub = state.regions[indexCategory].districts.findIndex(
        (item) => item._id === payload._id
      );
      state.regions[indexCategory].districts[indexSub] = payload;
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
      const indexCategory = state.regions.findIndex(
        (item) => item._id === payload.region
      );
      state.regions[indexCategory].districts = state.regions[
        indexCategory
      ].districts.filter((el) => el._id != payload._id);
    },
    [deleteDistrict.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearErrorRegions } = regionsSlice.actions;
export default regionsSlice.reducer;
