// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Define a service using a base URL and expected endpoints

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://athlon-gear-backend.vercel.app/api",
  }),
  tagTypes: ["createProduct"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["createProduct"],
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
    }),
    sendProductDetails: builder.mutation({
      query: (product) => ({
        url: "/products/createProduct",
        method: "POST",
        body: product, // Send the product data in the request body
      }),
      invalidatesTags: ["createProduct"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useSendOrderConfirmDataMutation,
  useSendProductDetailsMutation
} = baseApi;
