import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonBranchXService: [],
  search: "",
};

export const salonBranchXServiceSlice = createSlice({
  name: "SalonBranchXService",
  initialState: initialState,
  reducers: {
    setSalonBranchXService: (state, action) => {
      state.salonBranchXService = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSalonBranchXService, setSearchItem } = salonBranchXServiceSlice.actions;
export const salonBranchXServiceReducer = salonBranchXServiceSlice.reducer;
