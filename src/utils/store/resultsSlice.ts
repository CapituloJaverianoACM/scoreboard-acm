import { createSlice } from '@reduxjs/toolkit'

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        value: Array<string>()
    },
    reducers: {
        add: (state, result) => {
            state.value.push(result.payload)
        },
        clear: (state) => {
            state.value = new Array<string>()
        }
    }
})

export const { add, clear } = resultsSlice.actions;

export default resultsSlice.reducer;