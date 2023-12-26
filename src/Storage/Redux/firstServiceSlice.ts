import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstService: [],
  search: "",
};

export const firstServiceSlice = createSlice({
  name: "FirstService",
  initialState: initialState,
  reducers: {
    setFirstService: (state, action) => {
      state.firstService = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setFirstService, setSearchItem } = firstServiceSlice.actions;
export const firstServiceReducer = firstServiceSlice.reducer;
