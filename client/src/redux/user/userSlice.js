import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        neutral: (state) => {
            state.loading = false;
            state.error = null;
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logoutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        logoutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { neutral, loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure } = userSlice.actions;

export default userSlice.reducer;