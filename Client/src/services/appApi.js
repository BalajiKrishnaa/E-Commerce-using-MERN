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
    }),
})

export const { useSignupMutation, useSigninMutation, useCreateProductMutation } = appApi

export default appApi