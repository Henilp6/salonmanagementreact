import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const salonBranchXPaymentApi = createApi({
  reducerPath: "salonBranchXPaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["SalonBranchXPayments"],
  endpoints: (builder) => ({
    getSalonBranchXPayments: builder.query({
      query: () => ({
        url: "SalonBranchXPaymentAPI/GetSalonBranchXPayments",
      }),
      providesTags: ["SalonBranchXPayments"],
    }),

    getSalonBranchXPaymentById: builder.query({
      query: (id) => ({
        url: `SalonBranchXPaymentAPI/GetSalonBranchXPayment/${id}`,
      }),
      providesTags: ["SalonBranchXPayments"],
    }),

    getSalonBranchXPaymentBySalonBranchId: builder.query({
      query: (salonBranchId) => ({
        url: `SalonBranchXPaymentAPI/GetSalonBranchXPaymentBySalonBranchId/${salonBranchId}`,
      }),
      providesTags: ["SalonBranchXPayments"],
    }),

    createSalonBranchXPayment: builder.mutation({
      query: (data) => ({
        url: "SalonBranchXPaymentAPI/CreateSalonBranchXPayment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SalonBranchXPayments"],
    }),

    updateSalonBranchXPayment: builder.mutation({
      query: ({ data, id }) => ({
        url: "SalonBranchXPaymentAPI/UpdateSalonBranchXPayment/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SalonBranchXPayments"],
    }),
    
    deleteSalonBranchXPayment: builder.mutation({
      query: (id) => ({
        url: "SalonBranchXPaymentAPI/DeleteSalonBranchXPayment/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["SalonBranchXPayments"],
    }),
  }),
});

export const {
  useGetSalonBranchXPaymentsQuery,
  useGetSalonBranchXPaymentByIdQuery,
  useCreateSalonBranchXPaymentMutation,
  useUpdateSalonBranchXPaymentMutation,
  useDeleteSalonBranchXPaymentMutation,
  useGetSalonBranchXPaymentBySalonBranchIdQuery,
} = salonBranchXPaymentApi;
export default salonBranchXPaymentApi;
