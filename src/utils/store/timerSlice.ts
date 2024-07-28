import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
    seconds: number;
    minutes: number;
    hours: number;
    isRunning: boolean;
    isFrozen: boolean;
    secondsPassed: number;
}

const initialState: TimerState = {
    seconds: -1,
    minutes: -1,
    hours: -1,
    isRunning: false,
    isFrozen: false,
    secondsPassed: 0
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimer: (state, action: PayloadAction<{ seconds: number; minutes: number; hours: number; isFrozen: boolean }>) => {
            const { seconds, minutes, hours , isFrozen} = action.payload;
            state.seconds = seconds;
            state.minutes = minutes;
            state.hours = hours;
            state.isFrozen = isFrozen;
            state.secondsPassed++;
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
        resetTimer: (state, action: PayloadAction<{ seconds: number; minutes: number; hours: number; }>) => {
            const { seconds, minutes, hours } = action.payload;
            state.seconds = seconds;
            state.minutes = minutes;
            state.hours = hours;
            state.isRunning = false;
            state.isFrozen = false;
            state.secondsPassed = 0;
        }
    },
});

export const { setTimer, startTimer, pauseTimer, resetTimer, resumeTimer} = timerSlice.actions;
export default timerSlice.reducer;
