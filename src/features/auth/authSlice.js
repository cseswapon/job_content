import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    // console.log(email, password);
    return await createUserWithEmailAndPassword(auth, email, password);
  }
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async ({ email, password }) => {
    console.log(email, password);
    return await signInWithEmailAndPassword(auth, email, password);
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);
  return data.user.email;
});

const authSlice = createSlice({
  name: "CounterSlice",
  initialState,
  reducers: {
    singOut: (state) => {
      state.email = "";
    },
    addEmail: (state, action) => {
      state.email = action.payload;
      state.isLoading = false;
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
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
        state.email = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.error = "";
      })
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
        state.email = "";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.error = "";
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
        state.email = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.error = "";
      });
  },
});
export const { singOut, addEmail, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
