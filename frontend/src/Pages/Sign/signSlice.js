import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Config/Api";
import { universalToast } from "../../Components/ToastMessages/ToastMessages";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const signUpUser = createAsyncThunk(
  "login/signUp",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/signup", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUpOrganization = createAsyncThunk(
  "login/signUpOrganization",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/organization/create", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addOrganization = createAsyncThunk(
  "login/addOrganization",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/organization/new", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrganization = createAsyncThunk(
  "login/updateOrganization",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/user/organization/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "login/signIn",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/signin", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editProfileImage = createAsyncThunk(
  "login/editProfileImage",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const uploadMedia = createAsyncThunk(
    "login/editProfileImage",
    async ({ formData, setProgress }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(baseURL+"/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`${percentCompleted}%`); // Log progress to console
            setProgress(percentCompleted); // Update the progress state
          }
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
export const deleteProfileImage = createAsyncThunk(
  "login/deleteProfileImage",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/upload/del", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "login/getUser",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/user/getuserbyid", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "login/updateUser",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/user/update", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "login/updatePassword",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await Api.put("/user/updatepassword", body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const signSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    logged: false,
    loading: false,
    error: null,
    userData: {
      user: null,
      organization: null,
    },
  },
  reducers: {
    logOut: (state) => {
      state.logged = false;
      state.loading = false;
      state.error = null;
      state.userData = { user: null, organization: null };
      localStorage.removeItem("_grecaptcha");
    },
    clearError: (state) => {
      state.error = null;
    },
    addFavoriteToUser: (state, { payload: { product } }) => {
      if (state.userData.user.favorite) {
        state.userData.user.favorite = [
          ...state.userData.user.favorite,
          product._id,
        ];
      } else {
        state.userData.user.favorite = [product._id];
      }
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload: { token, user } }) => {
      state.loading = false;
      state.logged = true;
      state.userData = user;
      localStorage.setItem("_grecaptcha", JSON.stringify(token));
    },
    [signUpUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [signUpOrganization.pending]: (state) => {
      state.loading = true;
    },
    [signUpOrganization.fulfilled]: (
      state,
      { payload: { token, user, organization } }
    ) => {
      state.loading = false;
      state.logged = true;
      state.userData = { user, organization };
      localStorage.setItem("_grecaptcha", JSON.stringify(token));
    },
    [signUpOrganization.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },

    [addOrganization.pending]: (state) => {
      state.loading = true;
    },
    [addOrganization.fulfilled]: (
      state,
      { payload: { token, user, organization } }
    ) => {
      state.loading = false;
      state.logged = true;
      state.userData = { user, organization };
      // localStorage.setItem("_grecaptcha", JSON.stringify(token));
    },
    [addOrganization.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, { payload: { token, user, organization } }) => {
      state.loading = false;
      state.logged = true;
      state.userData = { user, organization };
      localStorage.setItem("_grecaptcha", JSON.stringify(token));
    },
    [signIn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
      state.logged = true;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, { payload: { user } }) => {
      state.loading = false;
      state.userData.user = user;
      universalToast("Личные данные пользователя успешно обновлены", "success");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      universalToast(payload, "error");
    },
    [updatePassword.pending]: (state) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload: { message } }) => {
      state.loading = false;
      universalToast(message, "success");
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      universalToast(payload, "error");
    },
    [updateOrganization.pending]: (state) => {
      state.loading = true;
    },
    [updateOrganization.fulfilled]: (state, { payload: { organization } }) => {
      state.loading = false;
      state.userData.organization = organization;
      universalToast("Данные компании успешно изменены! ", "success");
    },
    [updateOrganization.rejected]: (state, { payload }) => {
      state.loading = false;
      universalToast(payload, "error");
    },
  },
});

export const { clearError, logOut, addFavoriteToUser } = signSlice.actions;
export default signSlice.reducer;
