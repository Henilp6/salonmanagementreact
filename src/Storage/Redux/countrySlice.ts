import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: [],
};

export const countrySlice = createSlice({
  name: "Country",
  initialState: initialState,
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
