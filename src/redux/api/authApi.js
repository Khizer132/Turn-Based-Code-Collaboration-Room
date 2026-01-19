import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
        credentials: 'include', // Include cookies with requests
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),

        loginUser: builder.mutation({

            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),

        logoutUser: builder.query({
            query: () => "/logout",

        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLazyLogoutUserQuery, useLogoutUserQuery } = authApi;