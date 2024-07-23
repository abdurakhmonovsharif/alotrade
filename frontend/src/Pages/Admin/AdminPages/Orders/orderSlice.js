import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";
import { findIndex } from "lodash";
import { universalToast } from "../../../../Components/ToastMessages/ToastMessages";

export const getAllAdminOrders = createAsyncThunk(
  "adminOrders/getAll",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/order/getAll");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const confirmOrder = createAsyncThunk(
  "adminOrders/confirm",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(`/order/confirm/${body._id}`, body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const publishOrder = createAsyncThunk(
  "adminOrders/publish",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post(`/order/publish/${body._id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/delete",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/order/delete", { id: body?._id });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllAdminOrders.pending]: (state) => {
      state.loading = true;
    },
    [getAllAdminOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
    },
    [getAllAdminOrders.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [confirmOrder.pending]: (state) => {
      state.loading = true;
    },
    [confirmOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = state.orders.map((el) => {
        if (el._id === payload.id) {
          el.is_confirmed = true;
        }
        return el;
      });
    },
    [confirmOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteOrder.pending]: (state) => {
      state.loading = true;
    },
    [deleteOrder.fulfilled]: (state, { payload: { id } }) => {
      const orderIndex = findIndex(state.orders, { _id: id });
      state.orders.splice(orderIndex, 1);
      universalToast("Заказ успешно удален", "success");
      state.loading = false;
    },

    [publishOrder.pending]: (state) => {
      state.loading = true;
    },
    [publishOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = state.orders.map((el) => {
        if (el._id === payload.id) {
          el.is_published = true;
        }
        return el;
      });
    },
    [publishOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast("Xatolik!", "error");
    },

    // [deleteOrder.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteOrder.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.orders = state.orders.filter((el) => el._id != payload.id);
    // },
    // [deleteOrder.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
});

export default adminOrdersSlice.reducer;
