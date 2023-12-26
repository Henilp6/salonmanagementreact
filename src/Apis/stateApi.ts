import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stateApi = createApi({
  reducerPath: "stateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["States"],
  endpoints: (builder) => ({
    getStates: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: `StateAPI/GetStates/?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
      providesTags: ["States"],
    }),
    getAllStates: builder.query({
      query: () => ({
        url: `StateAPI/GetStates`,
      }),
      providesTags: ["States"],
    }),
    getStateById: builder.query({
      query: (id) => ({
        url: `StateAPI/GetState/${id}`,
      }),
      providesTags: ["States"],
    }),

    createState: builder.mutation({
      query: (data) => ({
        url: "StateAPI/CreateState",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["States"],
    }),

    updateState: builder.mutation({
      query: ({ data, id }) => ({
        url: "StateAPI/UpdateState/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["States"],
    }),
    
    deleteState: builder.mutation({
      query: (id) => ({
        url: "StateAPI/DeleteState/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["States"],
    }),

    getStatesByCountryId: builder.query({
      query: (countryId) => ({
        url: `StateAPI/GetStatesByCountryId/${countryId}`,
      }),
      providesTags: ["States"],
    }),
  }),
});

export const {
  useGetStatesQuery,
  useGetAllStatesQuery,
  useGetStateByIdQuery,
  useCreateStateMutation,
  useUpdateStateMutation,
  useDeleteStateMutation,
  useGetStatesByCountryIdQuery,
} = stateApi;
export default stateApi;
