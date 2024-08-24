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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: { isDeleted: true }, // Set isDeleted to true
      }),
      invalidatesTags: ["createProduct"],
    }),
    getAllProductsWithSearch: builder.query({
      query: ({
        searchTerm,
        category,
        sort,
      }: {
        searchTerm?: string;
        category?: string;
        sort?: string; // Add sort as an optional parameter
      }) => {
        const params: Record<string, string> = {};

        if (searchTerm && searchTerm.trim()) {
          params.searchTerm = searchTerm.trim();
        }

        if (category && category.trim()) {
          params.category = category.trim();
        }

        if (sort && sort.trim()) {
          params.sort = sort.trim(); // Add sort parameter if provided
        }

        return {
          url: `/products`,
          method: "GET",
          params,
        };
      },
    }),

    updateProduct: builder.mutation({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updates, // Pass the updates object
      }),
      invalidatesTags: ["createProduct"],
    }),
    TrackOneOrder: builder.query({
      query: (orderId) => `/orders/${orderId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useSendOrderConfirmDataMutation,
  useSendProductDetailsMutation,
  useDeleteProductMutation,
  useGetAllProductsWithSearchQuery,
  useUpdateProductMutation,
  useTrackOneOrderQuery,
} = baseApi;
