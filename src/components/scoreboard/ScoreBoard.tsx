import {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ScoreboardMessage, { TeamSubmission } from "../../utils/types/scoreboard.ts";
import { Problem, TeamStatus} from "../../utils/types/contest.ts";
import TeamRow from "./(team)/TeamRow.tsx";
import {useLocation} from "react-router-dom";
import Timer from "./Timer.tsx";
const ScoreBoard = () : ReactElement => {
    const dispatch = useDispatch();

     const resultsList : ScoreboardMessage[] = useSelector((state : any) => state.results.value);
    const location = useLocation();
    const contest = useSelector((state : any) => state.contest.value);
    console.log(contest);
    const teams : TeamStatus[] = useSelector((state : any) => state.teamStatus.value);
    const problems : Problem[] = useSelector((state : any) => state.problems.value);
    console.log(teams)
    return (
        <div className="pl-10">
            {/* Contest data */}
            <div className="flex felx-row space-x-8 p-9 h-[200px] w-[1000px]">
                <div className="flex flex-col space-y-3 w-[50%] rounded-md">
                    <h1 className="text-4xl font-bold text-white"> Name: {contest.name}</h1>
                    <h1 className="text-2xl text-white"> Duration: {contest.durationMinutes} </h1>
                    <h1 className="text-2xl text-white"> Frozen time before end: {contest.frozenMinutes} </h1>
                </div>
                <div className="w-[35vw] h-full text-center border-2 border-white rounded-lg text-5xl">
                    <Timer />
                </div>
            </div>
            {/* Table */}
            <div>
                {/* Header row */}
                <div className="flex flex-row space-x-4 text-[25px] ">
                    <div className="w-96 h-20 flex items-center justify-center text-center" style={{borderRadius: '5px'}}>
                        Teams
                    </div>
                    <div className="w-20 h-20 flex items-center justify-center text-center" style={{borderRadius: '5px'}}>
                        #
                    </div>
                    <div className="w-20 h-20 flex items-center justify-center text-center" style={{borderRadius: '5px'}}>
                        -
                    </div>
                    {problems.map((problem, index) => {
                        return (
                            <div key={index} className="w-20 h-20 flex items-center justify-center text-center" style={{borderRadius: '5px'}}>
                                {problem.letter}
                            </div>
                        );
                    })}
                </div>
                {/* Teams */}
                <div className="flex flex-col space-y-4">
                    {teams.map((teamStatus, index) => (
                        <TeamRow key={index} pos={index+1} teamStatus={teamStatus} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;