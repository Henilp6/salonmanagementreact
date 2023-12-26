import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: [],
};

export const citySlice = createSlice({
  name: "City",
  initialState: initialState,
  reducers: {
    setCity: (city, action) => {
      city.city = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
