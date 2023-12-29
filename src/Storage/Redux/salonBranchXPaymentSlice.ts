import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonBranchXPayment: [],
  search: "",
};

export const salonBranchXPaymentSlice = createSlice({
  name: "SalonBranchXPayment",
  initialState: initialState,
  reducers: {
    setSalonBranchXPayment: (state, action) => {
      state.salonBranchXPayment = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSalonBranchXPayment, setSearchItem } = salonBranchXPaymentSlice.actions;
export const salonBranchXPaymentReducer = salonBranchXPaymentSlice.reducer;
