import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Problem } from '../types/contest';

interface ProblemState {
    value: Problem[];
}

const initialState: ProblemState = {
    value: [],
};

const problemSlice = createSlice({
    name: 'problems',
    initialState,
    reducers: {
        addProblem: (state, action: PayloadAction<Problem>) => {
            state.value.push(action.payload);
        },
        clearProblems: (state) => {
            state.value = [];
        }
    },
});

export const { addProblem, clearProblems } = problemSlice.actions;
export default problemSlice.reducer;