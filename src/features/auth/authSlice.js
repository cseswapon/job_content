import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  email: "",
  role: "",
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    singOut: (state) => {
      state.email = "";
    },
  },
});

export const { singOut } = authSlice.actions;
export default authSlice.reducer