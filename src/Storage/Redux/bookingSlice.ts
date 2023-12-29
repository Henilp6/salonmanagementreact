import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: [],
  search: "",
};

export const bookingSlice = createSlice({
  name: "Booking",
  initialState: initialState,
  reducers: {
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setBooking, setSearchItem } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
