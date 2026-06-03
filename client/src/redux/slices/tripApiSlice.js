import { apiSlice } from "./apiSlice";

export const tripApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => "/trips",
      providesTags: ["Trip"],
    }),
    getTripById: builder.query({
      query: (id) => `/trips/${id}`,
      providesTags: (result, error, id) => [{ type: "Trip", id }],
    }),
    createTrip: builder.mutation({
      query: (data) => ({
        url: "/trips",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trip"],
    }),
    updateTrip: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/trips/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Trip", id }, "Trip"],
    }),
    trashTrip: builder.mutation({
      query: (id) => ({
        url: `/trips/${id}/trash`,
        method: "PATCH",
      }),
      invalidatesTags: ["Trip"],
    }),
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trip"],
    }),
    getTrashedTrips: builder.query({
      query: () => "/trips/trashed",
      providesTags: ["Trip"],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripByIdQuery,
  useCreateTripMutation,
  useUpdateTripMutation,
  useTrashTripMutation,
  useDeleteTripMutation,
  useGetTrashedTripsQuery,
} = tripApiSlice;
