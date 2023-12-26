import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const genderApi = createApi({
  reducerPath: "genderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["Genders"],
  endpoints: (builder) => ({
    getAllGenders: builder.query({
      query: () => ({
        url: "GenderAPI/GetGenders",
        method: "GET",
      }),
      providesTags: ["Genders"],
    }),
    getGenders: builder.query({
      query: ({ search, pageSize, pageNumber }) => ({
        url: "GenderAPI/GetGenders",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Genders"],
    }),
    
    getGenderById: builder.query({
      query: (id) => ({
        url: `GenderAPI/GetGender/${id}`,
      }),
      providesTags: ["Genders"],
    }),
    createGender: builder.mutation({
      query: (data) => ({
        url: "GenderAPI/CreateGender",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Genders"],
    }),
    updateGender: builder.mutation({
      query: ({ data, id }) => ({
        url: "GenderAPI/UpdateGender/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Genders"],
    }),
    deleteGender: builder.mutation({
      query: (id) => ({
        url: "GenderAPI/DeleteGender/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Genders"],
    }),
  }),
});

export const {
  useGetGendersQuery,
  useGetAllGendersQuery,
  useGetGenderByIdQuery,
  useCreateGenderMutation,
  useUpdateGenderMutation,
  useDeleteGenderMutation,
} = genderApi;

export default genderApi;
