import {createSlice} from "@reduxjs/toolkit";
import {Team} from "../types/contest.ts";

interface TeamState {
    value: Team[];
}

const initialState: TeamState = {
    value: [],
};

const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        addTeam: (state, action) => {
            state.value.push(action.payload);
        },
    },
});
export const {addTeam} = teamSlice.actions;
export default teamSlice.reducer;