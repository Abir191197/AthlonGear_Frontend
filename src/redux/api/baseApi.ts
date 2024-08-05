// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://athlon-gear-backend.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getOneProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    sendOrderConfirmData: builder.mutation({
      query: (orderDetails) => ({
        url: "/orders/createOrder",
        method: "POST",
        body: orderDetails,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useSendOrderConfirmDataMutation,
} = baseApi;
