import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";
import { universalToast } from "../../../../Components/ToastMessages/ToastMessages";

export const getAllAdminOrganizations = createAsyncThunk(
  "adminOrganizations/getAll",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/user/organization/getAll");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const activateOrganization = createAsyncThunk(
  "adminOrganizations/activate",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(
        `/user/organization/activate/${body._id}`,
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const disactivateOrganization = createAsyncThunk(
  "adminOrganizations/disactivate",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(
        `/user/organization/activate/${body._id}`,
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOrg = createAsyncThunk(
  "adminUsers/deleteOrg",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete(
        `/user/organization/remove/${body._id}`
        // {
        //   data: { _id: body._id },
        // }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adminOrganizationsSlice = createSlice({
  name: "adminOrganizations",
  initialState: {
    organizations: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllAdminOrganizations.pending]: (state) => {
      state.loading = true;
    },
    [getAllAdminOrganizations.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.organizations = payload;
    },
    [getAllAdminOrganizations.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [activateOrganization.pending]: (state) => {
      state.loading = true;
    },
    [activateOrganization.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.organizations = state.organizations.map((el) => {
        if (el._id === payload._id) {
          el.is_active = true;
        }

        return el;
      });
    },
    [activateOrganization.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [disactivateOrganization.pending]: (state) => {
      state.loading = true;
    },
    [disactivateOrganization.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.organizations = state.organizations.map((el) => {
        if (el._id === payload._id) {
          el.is_active = false;
        }

        return el;
      });
    },
    [disactivateOrganization.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteOrg.pending]: (state) => {
      state.loading = true;
    },
    [deleteOrg.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.organizations = state.organizations.filter(
        (el) => el._id != payload.id
      );
      universalToast("Tashkilot o'chirildi!", "success");
    },
    [deleteOrg.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default adminOrganizationsSlice.reducer;
