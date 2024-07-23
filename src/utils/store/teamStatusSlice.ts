import {createSlice} from "@reduxjs/toolkit";
import {TeamStatus} from "../types/contest.ts";

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
        addSubmission: (state, action) => {
            state.value = state.value.map((team) => {
                if(team.team.name === action.payload.teamName){
                    team.results = team.results.map((result) => {
                        if(result.problem.letter === action.payload.problemLetter){
                            result.tries++;
                            switch(action.payload.veredict){
                                case "CORRECT":
                                    result.status = "SOLVED";
                                    result.acceptedMinute = action.payload.minutes;
                                    break;
                                case "TLE":
                                    result.status = "TLE";
                                    break;
                                case "WA":
                                    result.status = "WA";
                                    break;
                            }
                        }
                        return result;
                    })
                }
                return team;
            })
        },
        clearTeamStatus: (state) => {
            state.value = [];
        }
    },
});
export const {addTeamStatus, clearTeamStatus, addSubmission} = teamStatusSlice.actions;
export default teamStatusSlice.reducer;