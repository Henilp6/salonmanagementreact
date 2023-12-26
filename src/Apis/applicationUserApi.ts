import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const applicationUserApi = createApi({
  reducerPath: "applicationUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["ApplicationUsers"],
  endpoints: (builder) => ({
    getApplicationUsers: builder.query({
      query: () => ({
        url: "ApplicationUserApi/GetApplicationUsers",
      }),
      providesTags: ["ApplicationUsers"],
    }),

    getApplicationUserById: builder.query({
      query: (id) => ({
        url: `ApplicationUserApi/GetApplicationUser/${id}`,
      }),
      providesTags: ["ApplicationUsers"],
    }),

    createApplicationUser: builder.mutation({
      query: (data) => ({
        url: "ApplicationUserApi/CreateApplicationUser",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ApplicationUsers"],
    }),

    updateApplicationUser: builder.mutation({
      query: (data) => ({
        url: "ApplicationUserApi/UpdateApplicationUser",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ApplicationUsers"],
    }),
    
    deleteApplicationUser: builder.mutation({
      query: (id) => ({
        url: "ApplicationUserApi/DeleteApplicationUser/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ApplicationUsers"],
    }),
  }),
});

export const {
  useGetApplicationUsersQuery,
  useGetApplicationUserByIdQuery,
  useCreateApplicationUserMutation,
  useDeleteApplicationUserMutation,
  useUpdateApplicationUserMutation
} = applicationUserApi;
export default applicationUserApi;
