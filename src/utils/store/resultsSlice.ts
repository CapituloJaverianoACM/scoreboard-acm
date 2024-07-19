import { createSlice } from '@reduxjs/toolkit'
import ScoreboardMessage from "../types/scoreboard.ts";

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        value: Array<ScoreboardMessage>()
    },
    reducers: {
        add: (state, result) => {
            state.value.push({
                type: "test",
                payload: result.payload
            })
        },
        clear: (state) => {
            state.value = new Array<ScoreboardMessage>()
        }
    }
})

export const { add, clear } = resultsSlice.actions;

export default resultsSlice.reducer;