import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationUser: [],
};

export const applicationUserSlice = createSlice({
  name: "ApplicationUser",
  initialState: initialState,
  reducers: {
    setApplicationUser: (state, action) => {
      state.applicationUser = action.payload;
    },
  },
});

export const { setApplicationUser } = applicationUserSlice.actions;
export const applicationUserReducer = applicationUserSlice.reducer;
