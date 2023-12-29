import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const salonBranchApi = createApi({
  reducerPath: "salonBranchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["SalonBranchs"],
  endpoints: (builder) => ({
    getSalonBranchs: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: "SalonBranchAPI/GetSalonBranchs",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["SalonBranchs"],
    }),
    getAllSalonBranchs: builder.query({
      query: () => ({
        url: "SalonBranchAPI/GetSalonBranchs",
        method: "GET",
      }),
      providesTags: ["SalonBranchs"],
    }),  
    getSalonBranchSearchByLazyLoading: builder.query({
      query: ({ pageNum, search }) => ({
        url: "SalonBranchAPI/SalonBranchSearchByLazyLoading",
        method: "Get",
        params: { pageNum, search },
      }),
      providesTags: ["SalonBranchs"],
    }),
    getSalonBranchSearchLocationByLazyLoading: builder.query({
      query: ({ pageNum, search, location }) => ({
        url: "SalonBranchAPI/SalonBranchSearchLocationByLazyLoading",
        method: "Get",
        params: { pageNum, search, location },
      }),
      providesTags: ["SalonBranchs"],
    }),
    getSalonBranchById: builder.query({
      query: (id) => ({
        url: `SalonBranchAPI/GetSalonBranch/${id}`,
      }),
      providesTags: ["SalonBranchs"],
    }),
    createSalonBranch: builder.mutation({
      query: (data) => ({
        url: "SalonBranchAPI/CreateSalonBranch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SalonBranchs"],
    }),
    updateSalonBranch: builder.mutation({
      query: ({ data, id }) => ({
        url: "SalonBranchAPI/UpdateSalonBranch/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SalonBranchs"],
    }),
    deleteSalonBranch: builder.mutation({
      query: (id) => ({
        url: "SalonBranchAPI/DeleteSalonBranch/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["SalonBranchs"],
    }),
  }),
});

export const {
  useGetSalonBranchsQuery,
  useGetSalonBranchSearchByLazyLoadingQuery,
  useGetSalonBranchSearchLocationByLazyLoadingQuery,
  useGetSalonBranchByIdQuery,
  useGetAllSalonBranchsQuery,
  useCreateSalonBranchMutation,
  useUpdateSalonBranchMutation,
  useDeleteSalonBranchMutation,
} = salonBranchApi;

export default salonBranchApi;
