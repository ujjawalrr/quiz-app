import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    attemptedQuestions: {},
    checkedQuestions: null,
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
        updateQuestions: (state, action) => {
            state.questions = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateAttemptedQuestions: (state, action) => {
            state.attemptedQuestions = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateCheckedQuestions: (state, action) => {
            state.checkedQuestions = action.payload;
            state.loading = false;
            state.error = null;
        }
    }
})

export const { neutral, updateQuestions, updateAttemptedQuestions, updateCheckedQuestions } = questionSlice.actions;

export default questionSlice.reducer;