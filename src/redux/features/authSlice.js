import { authentication } from "../../api/auth-api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (firebaseToken, { rejectWithValue }) => {
    try {
      // console.log(firebaseToken);
      var response = await authentication(firebaseToken);
      // store user's token in local storage
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  userInfo: null,
  token: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      // console.log(action.payload.user);
      state.loading = false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
    });

    // register user reducer...
  },
});

export const selectToken = (state) => state.auth.token;
export const selectUserInfor = (state) => state.auth.userInfo;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
