import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { sessionApi } from './api/sessionApi'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, sessionApi.middleware),
})

