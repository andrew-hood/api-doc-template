import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "auth",
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      window.localStorage.setItem("token", action.payload.access_token);
    },
    logout: (state) => {
      state.value = null;
      window.localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = errorSlice.actions;

export default errorSlice.reducer;
