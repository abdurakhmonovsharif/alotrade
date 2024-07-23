import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Config/Api";
import { universalToast } from "../../../Components/ToastMessages/ToastMessages";
import { findIndex } from "lodash";

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/offer/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOffers = createAsyncThunk(
  "offers/getOffers",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.get("/offer/getoffers", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOfferByUser = createAsyncThunk(
  "offers/getOffersByUser",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/offer/getofferbyuser", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOfferById = createAsyncThunk(
  "offers/getOffersById",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/offer/getofferbyid", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMessagesByOffer = createAsyncThunk(
  "offers/getMessagesByOffer",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/offer/getmessagesbyoffer", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createMessage = createAsyncThunk(
  "offers/createMessage",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/offer/createmessage", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMessageById = createAsyncThunk(
  "offers/getMessageById",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/offer/getmessagebyid", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const offerSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrorCategories: (state) => {
      state.error = null;
    },
    setAllMessages: (state, { payload: { messages } }) => {
      state.messages = messages;
    },
    addMessage: (state, { payload: { message } }) => {
      state.messages = [...state.messages, message];
    },
  },
  extraReducers: {
    [createOffer.pending]: (state) => {
      state.loading = true;
    },
    [createOffer.fulfilled]: (state, { payload: { offer, messages } }) => {
      state.loading = false;
      state.offers = [offer, ...state.offers];
      state.messages = messages;
    },
    [createOffer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getOffers.pending]: (state) => {
      state.loading = true;
    },
    [getOffers.fulfilled]: (state, { payload: { offers } }) => {
      state.loading = false;
      state.offers = offers;
    },
    [getOffers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getMessagesByOffer.pending]: (state) => {
      state.loading = true;
    },
    [getMessagesByOffer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.messages = payload;
    },
    [getMessagesByOffer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getOfferByUser.pending]: (state) => {
      state.loading = true;
    },
    [getOfferByUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [createMessage.pending]: (state) => {
      state.loading = true;
    },
    [createMessage.fulfilled]: (state, { payload: { message, offer } }) => {
      const index = findIndex(
        state.offers,
        (offer) => offer._id === message.offer
      );
      state.offers.splice(index, 1);
      state.loading = false;
      state.offers = [offer, ...state.offers];
      state.messages = [...state.messages, message];
    },
    [createMessage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getMessageById.pending]: (state) => {
      state.loading = true;
    },
    [getMessageById.fulfilled]: (state, { payload: { message } }) => {
      state.messages = [...state.messages, message];
    },
    [getMessageById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getOfferById.pending]: (state) => {
      state.loading = true;
    },
    [getOfferById.fulfilled]: (state, { payload: { offer } }) => {
      const index = findIndex(state.offers, { _id: offer._id });
      state.offers[index] = offer;
    },
    [getOfferById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
  },
});

export const { clearErrorCategories, setAllMessages, addMessage } =
  offerSlice.actions;
export default offerSlice.reducer;
