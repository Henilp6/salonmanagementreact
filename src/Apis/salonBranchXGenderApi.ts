import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const salonBranchXGenderApi = createApi({
  reducerPath: "salonBranchXGenderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["SalonBranchXGenders"],
  endpoints: (builder) => ({
    getSalonBranchXGenders: builder.query({
      query: () => ({
        url: "SalonBranchXGenderAPI/GetSalonBranchXGenders",
      }),
      providesTags: ["SalonBranchXGenders"],
    }),

    getSalonBranchXGenderById: builder.query({
      query: (id) => ({
        url: `SalonBranchXGenderAPI/GetSalonBranchXGender/${id}`,
      }),
      providesTags: ["SalonBranchXGenders"],
    }),

    getSalonBranchXGenderBySalonBranchId: builder.query({
      query: (salonBranchId) => ({
        url: `SalonBranchXGenderAPI/GetSalonBranchXGenderBySalonBranchId/${salonBranchId}`,
      }),
      providesTags: ["SalonBranchXGenders"],
    }),

    createSalonBranchXGender: builder.mutation({
      query: (data) => ({
        url: "SalonBranchXGenderAPI/CreateSalonBranchXGender",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SalonBranchXGenders"],
    }),

    updateSalonBranchXGender: builder.mutation({
      query: ({ data, id }) => ({
        url: "SalonBranchXGenderAPI/UpdateSalonBranchXGender/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SalonBranchXGenders"],
    }),
    
    deleteSalonBranchXGender: builder.mutation({
      query: (id) => ({
        url: "SalonBranchXGenderAPI/DeleteSalonBranchXGender/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["SalonBranchXGenders"],
    }),
  }),
});

export const {
  useGetSalonBranchXGendersQuery,
  useGetSalonBranchXGenderByIdQuery,
  useCreateSalonBranchXGenderMutation,
  useUpdateSalonBranchXGenderMutation,
  useDeleteSalonBranchXGenderMutation,
  useGetSalonBranchXGenderBySalonBranchIdQuery,
} = salonBranchXGenderApi;
export default salonBranchXGenderApi;
