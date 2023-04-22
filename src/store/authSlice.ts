import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "./../interface/IAuth";
import { IUser } from "./../interface/IUser";

const initialState: IAuth = {
  user    : null,
  token   : null,
  deadline: null,
};

const authSlice = createSlice({
  name    : "auth",
  initialState,
  reducers: {
    authLogin: (state, { payload }: { payload: IAuth }) => {
      state.token = payload.token;
      return state;
    },
    authLogout: (state) => {
      state.user = null;
      state.token = null;
      state.deadline = null;
      return state;
      
    },
    authMe: (state, { payload }: { payload: IUser}) => {
      state.user = payload;
      state.deadline = payload.deadline;
      return state;
    }
  },
});

export const authReducer = authSlice.reducer;

export const { authLogin, authMe, authLogout } = authSlice.actions;