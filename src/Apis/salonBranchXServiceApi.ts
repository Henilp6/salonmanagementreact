import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const salonBranchXServiceApi = createApi({
  reducerPath: "salonBranchXServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["SalonBranchXServices"],
  endpoints: (builder) => ({
    getSalonBranchXServices: builder.query({
      query: () => ({
        url: "SalonBranchXServiceAPI/GetSalonBranchXServices",
      }),
      providesTags: ["SalonBranchXServices"],
    }),

    getSalonBranchXServiceById: builder.query({
      query: (id) => ({
        url: `SalonBranchXServiceAPI/GetSalonBranchXService/${id}`,
      }),
      providesTags: ["SalonBranchXServices"],
    }),

    getSalonBranchXServiceBySalonBranchId: builder.query({
      query: (salonBranchId) => ({
        url: `SalonBranchXServiceAPI/GetSalonBranchXServiceBySalonBranchId/${salonBranchId}`,
      }),
      providesTags: ["SalonBranchXServices"],
    }),

    createSalonBranchXService: builder.mutation({
      query: (data) => ({
        url: "SalonBranchXServiceAPI/CreateSalonBranchXService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SalonBranchXServices"],
    }),

    updateSalonBranchXService: builder.mutation({
      query: ({ data, id }) => ({
        url: "SalonBranchXServiceAPI/UpdateSalonBranchXService/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SalonBranchXServices"],
    }),
    
    deleteSalonBranchXService: builder.mutation({
      query: (id) => ({
        url: "SalonBranchXServiceAPI/DeleteSalonBranchXService/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["SalonBranchXServices"],
    }),
  }),
});

export const {
  useGetSalonBranchXServicesQuery,
  useGetSalonBranchXServiceByIdQuery,
  useCreateSalonBranchXServiceMutation,
  useUpdateSalonBranchXServiceMutation,
  useDeleteSalonBranchXServiceMutation,
  useGetSalonBranchXServiceBySalonBranchIdQuery,
} = salonBranchXServiceApi;
export default salonBranchXServiceApi;
