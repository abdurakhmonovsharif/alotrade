import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../../../Config/Api";
import {universalToast} from "../../../../Components/ToastMessages/ToastMessages";

export const getAllAnns = createAsyncThunk(
    "adminAnns/getAll",
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.get("/announcement/post");
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const confirmAnn = createAsyncThunk(
    "adminAnns/confirm",
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post(
                `/announcement/post/confirm/${body._id}`,
                body
            );
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const publishAnn = createAsyncThunk(
    "adminAnns/publish",
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post(`/announcement/post/publish/${body._id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const updateMediasAnn = createAsyncThunk(
    "adminAnns/updateMedia",
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.patch(
                `/announcement/post/updateMedia/${body._id}`,
                body
            );
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteAnn = createAsyncThunk(
    "adminAnns/delete",
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.delete(`/announcement/post/${body._id}`, body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const annsSlice = createSlice({
    name: "adminAnns",
    initialState: {
        anns: null,
        loading: false,
        error: null,
    },
    extraReducers: {
        [getAllAnns.pending]: (state) => {
            state.loading = true;
        },
        [getAllAnns.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.anns = payload;
        },
        [getAllAnns.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
        [confirmAnn.pending]: (state) => {
            state.loading = true;
        },
        [confirmAnn.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.anns = state.anns.map((el) => {
                if (el._id === payload.id) {
                    el.is_confirmed = true;
                }
                return el;
            });
        },
        [confirmAnn.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
        [publishAnn.pending]: (state) => {
            state.loading = true;
        },
        [publishAnn.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.anns = state.anns.map((el) => {
                if (el._id === payload.id) {
                    el.is_published = true;
                }
                return el;
            });
        },
        [publishAnn.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
            universalToast("Xatolik!", "error");
        },
        [deleteAnn.pending]: (state) => {
            state.loading = true;
        },
        [deleteAnn.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.anns = state.anns.filter((el) => el._id != payload.id);
        },
        [deleteAnn.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default annsSlice.reducer;
