import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: [],
};

export const stateSlice = createSlice({
  name: "State",
  initialState: initialState,
  reducers: {
    setState: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setState } = stateSlice.actions;
export const stateReducer = stateSlice.reducer;
