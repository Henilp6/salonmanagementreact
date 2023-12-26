import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "users/Register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "users/Login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
   useLoginUserMutation,
} = usersApi;
export default usersApi;





  
// export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
// export default authApi;
