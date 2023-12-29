import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44306/api/v1/",
  }),
  tagTypes: ["Citys"],
  endpoints: (builder) => ({
    getCitys: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: `CityAPI/GetCitys/?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
      providesTags: ["Citys"],
    }),
    getAllCitys: builder.query({
      query: () => ({
        url: `CityAPI/GetCitys`,
      }),
      providesTags: ["Citys"],
    }),

    getCityById: builder.query({
      query: (id) => ({
        url: `CityAPI/GetCity/${id}`,
      }),
      providesTags: ["Citys"],
    }),
    getCitysByStateId: builder.query({
      query: (stateId) => ({
        url: `CityAPI/GetCitysByStateId/${stateId}`,
      }),
      providesTags: ["Citys"],
    }),
   
    createCity: builder.mutation({
      query: (data) => ({
        url: "CityAPI/CreateCity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Citys"],
    }),

    updateCity: builder.mutation({
      query: ({ data, id }) => ({
        url: "CityAPI/UpdateCity/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Citys"],
    }),
    
    deleteCity: builder.mutation({
      query: (id) => ({
        url: "CityAPI/DeleteCity/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Citys"],
    }),
  }),
});

export const {
  useGetCitysQuery,
  useGetAllCitysQuery,
  useGetCityByIdQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetCitysByStateIdQuery,
} = cityApi;
export default cityApi;
