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
  email: "",
  role: "",
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

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    singOut: (state) => {
      state.email = "";
    },
    addEmail: (state, action) => {
      state.email = action.payload;
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
        state.email = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload.user.email;
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
        state.email = "";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload.user.email;
        state.error = "";
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { singOut, addEmail, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
