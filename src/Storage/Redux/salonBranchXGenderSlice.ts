import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonBranchXGender: [],
  search: "",
};

export const salonBranchXGenderSlice = createSlice({
  name: "SalonBranchXGender",
  initialState: initialState,
  reducers: {
    setSalonBranchXGender: (state, action) => {
      state.salonBranchXGender = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSalonBranchXGender, setSearchItem } = salonBranchXGenderSlice.actions;
export const salonBranchXGenderReducer = salonBranchXGenderSlice.reducer;
