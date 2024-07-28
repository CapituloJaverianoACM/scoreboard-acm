import {createSlice, Draft} from "@reduxjs/toolkit";
import {Problem, Submission, TeamResult, TeamStatus} from "../types/contest.ts";

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
        },
        addTeamResult: (state, action : {
            payload: Submission,
            type: string
        }) => {
            const problemReceived: Draft<TeamResult>| undefined= state.value.find(
                teamStat => action.payload.team == teamStat.team.name)!.
            results.find(p => action.payload.submission.problem == p.problem.name);

            if (!problemReceived || problemReceived.status == "SOLVED") return

            if (action.payload.submission.isFrozen) {
                state.value.find(
                    teamStat => action.payload.team == teamStat.team.name)?.frozenSubmissions.push(action.payload)
            } else {
                problemReceived.tries = (["WA", "TLE"].find(s => s == action.payload.submission.result) != null) ? problemReceived.tries + 1 : problemReceived.tries;
                problemReceived.acceptedTimeStamp = action.payload.submission.timeStamp
                problemReceived.seconds = action.payload.submission.seconds
                problemReceived.status = (["WA", "TLE"].find(s => s == action.payload.submission.result) != null) ? "WA" : "SOLVED";
                if (problemReceived.status == "WA") {
                    state.value.find(
                        teamStat => action.payload.team == teamStat.team.name)!.penalty+=20;
                } else if (problemReceived.status == "SOLVED") {
                    state.value.find(
                        teamStat => action.payload.team == teamStat.team.name)!.problemsSolved++;
                        state.value.find(
                            teamStat => action.payload.team == teamStat.team.name)!.penalty += Math.floor(problemReceived.seconds / 60);
                }
            }
        }
    },
});
export const {addTeamStatus, clearTeamStatus, addTeamResult} = teamStatusSlice.actions;
export default teamStatusSlice.reducer;