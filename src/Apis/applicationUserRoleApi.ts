import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const applicationUserRoleApi = createApi({
  reducerPath: "applicationUserRoleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["ApplicationUserRoles"],
  endpoints: (builder) => ({
    getApplicationUserRoles: builder.query({
      query: () => ({
        url: "ApplicationUserRoleApi/GetApplicationUserRoles",
      }),
      providesTags: ["ApplicationUserRoles"],
    }),

    

    getApplicationUserRoleById: builder.query({
      query: (id) => ({
        url: `ApplicationUserRoleApi/GetApplicationUserRole/${id}`,
      }),
      providesTags: ["ApplicationUserRoles"],
    }),

    getApplicationUserRoleByUserId: builder.query({
      query: (userId) => ({
        url: `ApplicationUserRoleApi/GetApplicationUserRoleByUserId/${userId}`,
      }),
      providesTags: ["ApplicationUserRoles"],
    }),

    // createApplicationUser: builder.mutation({
    //   query: (data) => ({
    //     url: "ApplicationUserApi/CreateApplicationUser",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["ApplicationUsers"],
    // }),

    // updateApplicationUser: builder.mutation({
    //   query: ({ data, id }) => ({
    //     url: "ApplicationUserApi/UpdateApplicationUser/" + id,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["ApplicationUsers"],
    // }),
    
    // deleteApplicationUser: builder.mutation({
    //   query: (id) => ({
    //     url: "ApplicationUserApi/DeleteApplicationUser/" + id,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["ApplicationUsers"],
    // }),
  }),
});

export const {
  useGetApplicationUserRolesQuery,
  useGetApplicationUserRoleByIdQuery,
  useGetApplicationUserRoleByUserIdQuery
} = applicationUserRoleApi;
export default applicationUserRoleApi;
