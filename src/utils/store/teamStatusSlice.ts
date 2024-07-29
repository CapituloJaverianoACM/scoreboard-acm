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

            if (!problemReceived || (problemReceived.status == "SOLVED" && !action.payload.submission.isFrozen)) return

            if (action.payload.submission.isFrozen) {
                problemReceived?.frozenSubmissions.push(action.payload)
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
            state.value.sort((a, b) => {
                if (a.problemsSolved != b.problemsSolved) {
                    return b.problemsSolved - a.problemsSolved;
                }
                if (a.penalty != b.penalty) {
                    return a.penalty - b.penalty;
                }
                return a.team.name.localeCompare(b.team.name);
            });
        },
        popLastFrozenSubmission: (state, action : {
            payload: TeamStatus,
            type: string
        }) => {

            let targetSubmission : Draft<Submission> | undefined = undefined;
            let problemReceived: Draft<TeamResult>| undefined = undefined;
            const teamAffected = state.value.find(t => t.team.shortName == action.payload.team.shortName);
            for (const result of teamAffected!.results) {
                if (result.frozenSubmissions.length == 0) continue

                targetSubmission = result.frozenSubmissions.pop();
                problemReceived = result;
                break
            }

            if (!targetSubmission || !problemReceived) return;

            problemReceived.tries = (["WA", "TLE"].find(s => s == targetSubmission.submission.result) != null) ? problemReceived.tries + 1 : problemReceived.tries;
            problemReceived.acceptedTimeStamp = targetSubmission.submission.timeStamp
            problemReceived.seconds = targetSubmission.submission.seconds
            problemReceived.status = (["WA", "TLE"].find(s => s == targetSubmission.submission.result) != null) ? "WA" : "SOLVED";
            if (problemReceived.status == "WA") {
                state.value.find(
                    teamStat => targetSubmission.team == teamStat.team.name)!.penalty+=20;
            } else if (problemReceived.status == "SOLVED") {
                state.value.find(
                    teamStat => targetSubmission.team == teamStat.team.name)!.problemsSolved++;
                state.value.find(
                    teamStat => targetSubmission.team == teamStat.team.name)!.penalty += Math.floor(problemReceived.seconds / 60);
                problemReceived.frozenSubmissions = []
            }
            state.value.sort((a, b) => {
                if (a.problemsSolved != b.problemsSolved) {
                    return b.problemsSolved - a.problemsSolved;
                }
                if (a.penalty != b.penalty) {
                    return a.penalty - b.penalty;
                }
                return a.team.name.localeCompare(b.team.name);
            });

        },

        reverseFrozenSubmissions: (state) => {
            for (const teamStatus of state.value) {
                for (const result of teamStatus.results) {
                    result.frozenSubmissions.reverse()
                }
            }
        }
    },
});
export const {addTeamStatus, clearTeamStatus, addTeamResult, popLastFrozenSubmission, reverseFrozenSubmissions} = teamStatusSlice.actions;
export default teamStatusSlice.reducer;