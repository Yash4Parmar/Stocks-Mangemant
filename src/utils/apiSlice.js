import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from './contants'
 
 
 export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['stocks', 'orders' ],
    endpoints: (builder)=>({
        getStocks: builder.query({
            query: () => `/Stocks`,
            method: 'GET',
            providesTags: ['stocks']
        }),
        getOrders: builder.query({
            query: () => `/Orders`,
            method: 'GET',
            providesTags: ['orders']
        }),
        
        addStock: builder.mutation({
            query: (body) => ({
                url: '/Stocks',
                method: 'POST',
                body: body
            }),
            providesTags: ['stocks']
        }),
        addOrder: builder.mutation({
            query: (body) => ({
                url: '/Orders',
                method: 'POST',
                body: body
            }),
            providesTags: ['orders']
        }),

        deleteStock: builder.mutation({
            query: (stockId) => ({
                url: `/Stocks/${stockId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['stocks']
        }),

        deleteorder: builder.mutation({
            query: (orderId) => ({
                url: `/Orders/${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['orders']
        }),

    })
 })

 export const {
    useGetStocksQuery,
    useGetOrdersQuery,

    useAddStockMutation,
    useAddOrderMutation,

    useDeleteStockMutation,
    useDeleteorderMutation
 } = apiSlice