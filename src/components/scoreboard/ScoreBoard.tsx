import {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ScoreboardMessage, { TeamSubmission } from "../../utils/types/scoreboard.ts";
import { Problem, TeamStatus} from "../../utils/types/contest.ts";
import TeamRow from "./(team)/TeamRow.tsx";
import { addSubmission } from "../../utils/store/teamStatusSlice.ts";
import { addResult } from "../../utils/store/resultsSlice.ts";
const ScoreBoard = () : ReactElement => {
    const dispatch = useDispatch();

    const resultsList : ScoreboardMessage[] = useSelector((state : any) => state.results.value);
    const contest = useSelector((state : any) => state.contest.value);
    const teams : TeamStatus[] = useSelector((state : any) => state.teamStatus.value);
    const problems : Problem[] = useSelector((state : any) => state.problems.value);


    // States for the component
    const [teamsStatus, setTeamsStatus] = useState(teams);
    const [freezed, setFreezed] = useState(false);
    const [lastRendered, setLastRendered] = useState(0);
    const [lastChecked, setLastChecked] = useState(0);

    // Listen to changes in the results list
    useEffect(() => {
        if(resultsList.length === 0) return;
        const submission : TeamSubmission = resultsList[lastChecked].payload as TeamSubmission
        if(freezed){
            // update teamsStatus with the problem submission state to pending
            setTeamsStatus(teamsStatus.map((team) => {
                if(team.team.name === submission.teamName){
                    team.results = team.results.map((result) => {
                        if(result.problem.letter === submission.problemLetter){
                            result.status = "PENDING";
                        }
                        return result;
                    })
                }
                return team;
            }));
            setLastChecked(lastChecked + 1);
            return;
        };
        switch(resultsList[lastRendered].type){
            case "SUBMISSION":
                dispatch(addSubmission(submission));
                break;
            case "TIME_FREEZE":
                setFreezed(true); // Freeze the scoreboard
                break;
            case "REVELATOR":
                break;
        }
        setLastRendered(lastRendered + 1);
        setLastChecked(lastChecked + 1);
    }, [resultsList]);

    return (
        <div className="pl-10">
            {/* Contest data */}
            <div className="flex felx-row space-x-8 p-9 h-[200px] w-[1000px]">
                <div className="flex flex-col space-y-3 w-[50%] rounded-md">
                    <h1 className="text-4xl font-bold text-white"> Name: {contest.name}</h1>
                    <h1 className="text-2xl text-white"> Duration: {contest.durationMinutes} </h1>
                    <h1 className="text-2xl text-white"> Frozen time before end: {contest.frozenMinutes} </h1>
                </div>
                <div className="w-[50%] bg-[#ffffff70] rounded-md">
                    { /* TODO: Timer */ }
                    <h1 className="text-4xl font-bold text-center text-black"> TIMER </h1>
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