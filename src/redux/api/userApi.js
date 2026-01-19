import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setUser } from '../features/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
        credentials: 'include', // Include cookies with requests
    }),
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => "/me",
            transformResponse: (response) => response.user,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }   
            },
        }),
    }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = userApi;