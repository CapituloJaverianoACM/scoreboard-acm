import { createSlice } from '@reduxjs/toolkit'
import ScoreboardMessage from "../types/scoreboard.ts";

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        value: Array<ScoreboardMessage>()
    },
    reducers: {
        addResult: (state, result) => {
            state.value.push(result.payload)
        },
        clearResult: (state) => {
            state.value = new Array<ScoreboardMessage>()
        }
    }
})

export const { addResult, clearResult } = resultsSlice.actions;

export default resultsSlice.reducer;