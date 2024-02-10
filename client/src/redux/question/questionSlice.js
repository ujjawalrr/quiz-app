import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attemptedQuestions: {},
    checkedQuestions: {},
    optionColors: {},
    error: false,
    loading: false,
};

const questionSlice = createSlice ({
    name: 'question',
    initialState,
    reducers: {
        neutral: (state) => {
            state.loading = false;
            state.error = false;
        },
        updateQuestions: (state, action) => {
            state.questions = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateAttemptedQuestions: (state, action) => {
            state.attemptedQuestions = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateCheckedQuestions: (state, action) => {
            state.checkedQuestions = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateOptionColors: (state, action) => {
            state.optionColors = action.payload;
            state.loading = false;
            state.error = false;
        }
    }
})

export const { neutral, updateQuestions, updateAttemptedQuestions, updateCheckedQuestions, updateOptionColors } = questionSlice.actions;

export default questionSlice.reducer;