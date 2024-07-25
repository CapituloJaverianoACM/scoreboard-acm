import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contest} from "../types/contest.ts";

interface ContestState {
    value: Contest;
}

const initialState: ContestState = {
    value: {
        name: '',
        durationMinutes: 0,
        frozenMinutes: 0,
    }
};

const contestSlice = createSlice({
    name: 'contest',
    initialState,
    reducers: {
        setContest: (state, action: PayloadAction<Contest>) => {
            state.value = action.payload;
        }
    },
});

export const { setContest } = contestSlice.actions;

export default contestSlice.reducer;