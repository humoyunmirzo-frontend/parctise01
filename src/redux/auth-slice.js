import { createSlice } from "@reduxjs/toolkit";
import { removeItem, setItem } from "../helpers/persistance-storage";

let initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setItem("user", action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      removeItem("user");
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
