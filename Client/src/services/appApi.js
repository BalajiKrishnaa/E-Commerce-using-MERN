import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/register",
                method: "POST",
                body: user
            }),
        }),
        signin: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user
            }),
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product
            }),
        }),
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                method: "POST",
                body: cartInfo
            }),
        }),
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                method: "POST",
                body
            }),
        }),
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                method: "POST",
                body
            }),
        }),
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                method: "POST",
                body
            }),
        }),
    }),
})

export const { useSignupMutation, useSigninMutation, useCreateProductMutation,useAddToCartMutation,useIncreaseCartProductMutation,useRemoveFromCartMutation,useDecreaseCartProductMutation } = appApi

export default appApi