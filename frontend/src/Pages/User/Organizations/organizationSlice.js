import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Config/Api";
import { universalToast } from "../../../Components/ToastMessages/ToastMessages";

export const getOrganizations = createAsyncThunk(
  "organizations/getAllOrganizations",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/organization/getall", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrganizationsCount = createAsyncThunk(
  "organizations/getAllOrganizationsCount",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/organization/getallcount", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrganizationById = createAsyncThunk(
  "organizations/getAllOrganizationById",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/organization/getbyid", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const organizationSlice = createSlice({
  name: "organizations",
  initialState: {
    organizations: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrorCategories: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getOrganizations.pending]: (state) => {
      state.loading = true;
    },
    [getOrganizations.fulfilled]: (state, { payload: { organizations } }) => {
      state.loading = false;
      state.organizations = organizations;
    },
    [getOrganizations.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getOrganizationById.pending]: (state) => {
      state.loading = true;
    },
    [getOrganizationById.rejected]: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      universalToast(message, "error");
    },
  },
});

export const { clearErrorCategories } = organizationSlice.actions;
export default organizationSlice.reducer;
