import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: [],
  search: "",
};

export const paymentSlice = createSlice({
  name: "Payment",
  initialState: initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setPayment, setSearchItem } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
