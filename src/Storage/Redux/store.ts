import { configureStore } from "@reduxjs/toolkit";
import { applicationRoleReducer } from "./applicationRoleSlice";
import { applicationUserReducer } from "./applicationUserSlice";
import { applicationUserRoleReducer } from "./applicationUserRoleSlice";
import { userAuthReducer } from "./userAuthSlice";
import {
  applicationRoleApi,
  applicationUserApi,
  applicationUserRoleApi,
  usersApi,
  paymentApi,
  firstServiceApi,
  genderApi,
  countryApi,
  stateApi,
  cityApi,
} from "../../Apis";
import { countryReducer } from "./countrySlice";
import { stateReducer } from "./stateSlice";
import { cityReducer } from "./citySlice";
import { paymentReducer } from "./PaymentSlice";
import { genderReducer } from "./GenderSlice";
import { firstServiceReducer } from "./firstServiceSlice";


const store = configureStore({
  reducer: {
    applicationRoleStore : applicationRoleReducer,
    applicationUserStore : applicationUserReducer,
    applicationUserRoleStore : applicationUserRoleReducer,
    userAuthStore : userAuthReducer,
    paymentStore : paymentReducer,
    genderStore : genderReducer,
    firstServiceStore : firstServiceReducer,
    countryStore : countryReducer,
    stateStore : stateReducer,
    cityStore : cityReducer,



    [applicationRoleApi.reducerPath] : applicationRoleApi.reducer,
    [applicationUserApi.reducerPath] : applicationUserApi.reducer,
    [applicationUserRoleApi.reducerPath] : applicationUserRoleApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
    [paymentApi.reducerPath] : paymentApi.reducer,
    [genderApi.reducerPath] : genderApi.reducer,
    [firstServiceApi.reducerPath] : firstServiceApi.reducer,
    [countryApi.reducerPath] : countryApi.reducer,
    [stateApi.reducerPath] : stateApi.reducer,
    [cityApi.reducerPath] : cityApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationRoleApi.middleware)
      .concat(applicationUserApi.middleware)
      .concat(applicationUserRoleApi.middleware)
      .concat(usersApi.middleware)
      .concat(paymentApi.middleware)
      .concat(genderApi.middleware)
      .concat(firstServiceApi.middleware)
      .concat(countryApi.middleware)
      .concat(stateApi.middleware)
      .concat(cityApi.middleware)



});

export type RootState = ReturnType<typeof store.getState>;

export default store;
