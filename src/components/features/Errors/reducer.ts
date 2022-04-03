import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "errors",
  initialState: {
    value: [] as any,
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    reset: (state) => {
      state.value = [];
    },
  },
});

export const { add, reset } = errorSlice.actions;

export default errorSlice.reducer;
