import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
    seconds: number;
    minutes: number;
    hours: number;
    isRunning: boolean;
}

const initialState: TimerState = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    isRunning: false,
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimer: (state, action: PayloadAction<{ seconds: number; minutes: number; hours: number }>) => {
            const { seconds, minutes, hours } = action.payload;
            state.seconds = seconds;
            state.minutes = minutes;
            state.hours = hours;
        },
        startTimer: (state) => {
            state.isRunning = true;
        },
        resumeTimer: (state) => {
            state.isRunning = true;
        },
        pauseTimer: (state) => {
            state.isRunning = false;
        },
        resetTimer: (state) => {
            state.seconds = 0;
            state.minutes = 0;
            state.hours = 0;
            state.isRunning = false;
        },
    },
});

export const { setTimer, startTimer, pauseTimer, resetTimer, resumeTimer } = timerSlice.actions;
export default timerSlice.reducer;
