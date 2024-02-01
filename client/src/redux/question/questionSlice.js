import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attemptedQuestions: {},
    error: null,
    loading: false,
};

const questionSlice = createSlice ({
    name: 'question',
    initialState,
    reducers: {
        neutral: (state) => {
            state.loading = false;
            state.error = null;
        },
        updateAttemptedQuestionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAttemptedQuestions: (state, action) => {
            state.attemptedQuestions = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateAttemptedQuestionsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { neutral, updateAttemptedQuestionsStart, updateAttemptedQuestions, updateAttemptedQuestionsFailure } = questionSlice.actions;

export default questionSlice.reducer;