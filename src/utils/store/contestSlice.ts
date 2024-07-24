import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contest} from "../types/contest.ts";

interface ContestState {
    value: Contest;
    timerState: {
        expiryTimestamp: Date;
    };
}

const initialState: ContestState = {
    value: {
        name: '',
        durationMinutes: 0,
        frozenMinutes: 0,
    },
    timerState: {
        expiryTimestamp: new Date(),
    },
};

const contestSlice = createSlice({
    name: 'contest',
    initialState,
    reducers: {
        setContest: (state, action: PayloadAction<Contest>) => {
            state.value = action.payload;
            // Inicializar el timerState cuando se establece el concurso
            const now = new Date();
            now.setSeconds(now.getSeconds() + action.payload.durationMinutes * 60);
            state.timerState.expiryTimestamp = now;
        },
    },
});

export const { setContest } = contestSlice.actions;

export default contestSlice.reducer;