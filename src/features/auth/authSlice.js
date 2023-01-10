import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  user: { email: "", role: "" },
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async ({ email, password }) => {
    // console.log(email,password);
    return await signInWithEmailAndPassword(auth, email, password);
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${process.env.REACT_APP_localApi}user/${email}`);
  const data = await res.json();
  if (data.status) {
    return data;
  } else {
    return email;
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    singOut: (state) => {
      state.user.email = "";
    },
    addEmail: (state, action) => {
      state.user.email = action.payload;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user.email = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user.email = action.payload.user.email;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user.email = "";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user.email = action.payload.user.email;
        state.error = "";
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user = {};
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.isError = false;
        if (payload.status) {
          state.user = payload.data ? payload.data : null;
        } else {
          state.user.email = payload;
          state.user.role = "";
        }
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { singOut, addEmail, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
