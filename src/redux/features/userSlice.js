import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    initialState,  
    name: "userSlice", 
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        resetStates : (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setIsAuthenticated, setUser, resetStates } = userSlice.actions;

export default userSlice.reducer;