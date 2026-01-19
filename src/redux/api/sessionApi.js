import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const sessionApi = createApi({
    reducerPath: 'sessionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
        credentials: 'include', // Include cookies with requests
    }),
    endpoints: (builder) => ({
        createSession: builder.mutation({
            query: () => ({
                url: "/session/create",
                method: "POST",
            }),
        }),

        joinSession: builder.mutation({
            query: ({ sessionId }) => ({
                url: "/session/join",
                method: "POST",
                body: { sessionId },
            }),
        }),

        getMultiSession: builder.query({
            query: ({ sessionId }) => `/session/${sessionId}`,
        }),
    }),
});

export const { useJoinSessionMutation, useCreateSessionMutation, useGetMultiSessionQuery } = sessionApi;