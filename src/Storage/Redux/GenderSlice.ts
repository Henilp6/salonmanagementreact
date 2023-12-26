import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gender: [],
  search: "",
};

export const genderSlice = createSlice({
  name: "Gender",
  initialState: initialState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setGender, setSearchItem } = genderSlice.actions;
export const genderReducer = genderSlice.reducer;
