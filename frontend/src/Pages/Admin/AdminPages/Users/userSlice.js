import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";
import { universalToast } from "../../../../Components/ToastMessages/ToastMessages";

export const getAllUsers = createAsyncThunk(
  "adminUsers/getAll",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/user/getAll");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeBalanceUser = createAsyncThunk(
  "adminUsers/changeBalance",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/admin/changebalance", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "adminUsers/deleteUser",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.delete("/user/delete", {
        data: { id: body._id },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [changeBalanceUser.pending]: (state) => {
      state.loading = true;
    },
    [changeBalanceUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = state.users.map((el) => {
        if (el._id === payload?.userId) {
          el.balance = payload.balance;
        }
        return el;
      });
    },
    [changeBalanceUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = state.users.filter((el) => el._id != payload.id);
      universalToast("Foydalanuvchi o'chirildi!", "success");
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default usersSlice.reducer;
