import {createSlice} from "@reduxjs/toolkit";
import {TeamStatus} from "../types/contest.ts";
import { clear } from "./resultsSlice.ts";

interface TeamStatusState {
    value: TeamStatus[];
}

const initialState: TeamStatusState = {
    value: [],
};

const teamStatusSlice = createSlice({
    name: 'teamStatus',
    initialState,
    reducers: {
        addTeamStatus: (state, action) => {
            state.value.push(action.payload);
        },
        clearTeamStatus: (state) => {
            state.value = [];
        }
    },
});
export const {addTeamStatus, clearTeamStatus} = teamStatusSlice.actions;
export default teamStatusSlice.reducer;