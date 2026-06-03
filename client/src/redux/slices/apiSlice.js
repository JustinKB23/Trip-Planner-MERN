import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Trip"],
  endpoints: (builder) => ({}),
});
