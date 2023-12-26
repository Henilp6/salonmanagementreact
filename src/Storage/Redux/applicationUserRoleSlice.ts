import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationUserRole: [],
};

export const applicationUserRoleSlice = createSlice({
  name: "ApplicationUserRole",
  initialState: initialState,
  reducers: {
    setApplicationUserRole: (state, action) => {
      state.applicationUserRole = action.payload;
    },
  },
});

export const { setApplicationUserRole } = applicationUserRoleSlice.actions;
export const applicationUserRoleReducer = applicationUserRoleSlice.reducer;
