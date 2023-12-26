import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const firstServiceApi = createApi({
  reducerPath: "firstServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["FirstServices"],
  endpoints: (builder) => ({
    getAllFirstServices: builder.query({
      query: () => ({
        url: "FirstServiceAPI/GetFirstServices",
        method: "GET",
      }),
      providesTags: ["FirstServices"],
    }),
    getFirstServices: builder.query({
      query: ({ search, pageSize, pageNumber }) => ({
        url: "FirstServiceAPI/GetFirstServices",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["FirstServices"],
    }),
    
    getFirstServiceById: builder.query({
      query: (id) => ({
        url: `FirstServiceAPI/GetFirstService/${id}`,
      }),
      providesTags: ["FirstServices"],
    }),
    createFirstService: builder.mutation({
      query: (data) => ({
        url: "FirstServiceAPI/CreateFirstService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FirstServices"],
    }),
    updateFirstService: builder.mutation({
      query: ({ data, id }) => ({
        url: "FirstServiceAPI/UpdateFirstService/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FirstServices"],
    }),
    deleteFirstService: builder.mutation({
      query: (id) => ({
        url: "FirstServiceAPI/DeleteFirstService/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["FirstServices"],
    }),
  }),
});

export const {
  useGetFirstServicesQuery,
  useGetAllFirstServicesQuery,
  useGetFirstServiceByIdQuery,
  useCreateFirstServiceMutation,
  useUpdateFirstServiceMutation,
  useDeleteFirstServiceMutation,
} = firstServiceApi;

export default firstServiceApi;
