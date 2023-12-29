import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: "BookingAPI/GetBookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getBookings: builder.query({
      query: ({ search, pageSize, pageNumber }) => ({
        url: "BookingAPI/GetBookings",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Bookings"],
    }),
    
    getBookingById: builder.query({
      query: (id) => ({
        url: `BookingAPI/GetBooking/${id}`,
      }),
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: "BookingAPI/CreateBooking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: ({ data, id }) => ({
        url: "BookingAPI/UpdateBooking/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: "BookingAPI/DeleteBooking/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

export default bookingApi;
