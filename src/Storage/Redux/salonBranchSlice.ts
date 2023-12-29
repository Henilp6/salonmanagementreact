import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonBranch: [],
  search: "",
};

export const salonBranchSlice = createSlice({
  name: "SalonBranch",
  initialState: initialState,
  reducers: {
    setSalonBranch: (state, action) => {
      state.salonBranch = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSalonBranch, setSearchItem } = salonBranchSlice.actions;
export const salonBranchReducer = salonBranchSlice.reducer;
