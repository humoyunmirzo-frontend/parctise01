import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import roomsSlice from "./rooms-slice";
import categorySlice from "./category-slice";

export const store = configureStore({
  reducer: { authSlice, roomsSlice, categorySlice },
});
