import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

interface JwtType {
  sub: string;
  scopes: string[];
  exp: number;
}

export type AuthType = {
  access_token: string;
  userId: string;
  scopes: string[];
};

export const errorSlice = createSlice({
  name: "auth",
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => {
      const { access_token } = action.payload;
      if (access_token) {
        const { exp, sub, scopes } = jwt_decode<JwtType>(access_token);
        if (exp < Date.now() / 1000) return;

        state.value = {
          access_token,
          userId: sub,
          scopes: scopes || [],
        } as any;
        window.localStorage.setItem("token", access_token);
      }
    },
    logout: (state) => {
      state.value = null;
      window.localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = errorSlice.actions;

export default errorSlice.reducer;
