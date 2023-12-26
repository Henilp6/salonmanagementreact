import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationRole: [],
};

export const applicationRoleSlice = createSlice({
  name: "ApplicationRole",
  initialState: initialState,
  reducers: {
    setApplicationRole: (state, action) => {
      state.applicationRole = action.payload;
    },
  },
});

export const { setApplicationRole } = applicationRoleSlice.actions;
export const applicationRoleReducer = applicationRoleSlice.reducer;
