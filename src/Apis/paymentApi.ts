import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
        url: "PaymentAPI/GetPayments",
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),
    getPayments: builder.query({
      query: ({ search, pageSize, pageNumber }) => ({
        url: "PaymentAPI/GetPayments",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Payments"],
    }),
    
    getPaymentById: builder.query({
      query: (id) => ({
        url: `PaymentAPI/GetPayment/${id}`,
      }),
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "PaymentAPI/CreatePayment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
    updatePayment: builder.mutation({
      query: ({ data, id }) => ({
        url: "PaymentAPI/UpdatePayment/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: "PaymentAPI/DeletePayment/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;

export default paymentApi;
