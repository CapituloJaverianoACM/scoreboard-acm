import {createSlice} from '@reduxjs/toolkit'
import {Submission} from "../types/contest.ts";

export const submissionsSlice = createSlice({
    name: 'submissions',
    initialState: {
        value: Array<Submission>()
    },
    reducers: {
        addSubmission: (state, submission) => {
            state.value.push(submission.payload)
        },
        clearSubmissions: (state) => {
            state.value = new Array<Submission>()
        }
    }
})

export const { addSubmission, clearSubmissions } = submissionsSlice.actions;

export default submissionsSlice.reducer;