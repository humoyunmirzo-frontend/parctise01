import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: { rooms: [] },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
