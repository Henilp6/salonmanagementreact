import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuth: [],
};

export const userAuthSlice = createSlice({
  name: "UserAuth",
  initialState: initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
  },
});

export const { setUserAuth } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
