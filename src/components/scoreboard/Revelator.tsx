import {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Problem, Submission, TeamResult, TeamStatus} from "../../utils/types/contest.ts";
import TeamRow from "./(team)/TeamRow.tsx";
import FlipMove from "react-flip-move";
import {addTeamResult, popLastFrozenSubmission} from "../../utils/store/teamStatusSlice.ts";
import {useNavigate} from "react-router-dom";
const Revelator = () : ReactElement => {
    const contest = useSelector((state : any) => state.contest.value);
    const teams : TeamStatus[] = useSelector((state : any) => state.teamStatus.value);
    const problems : Problem[] = useSelector((state : any) => state.problems.value);
    const [teamsCopy, setTeamsCopy] = useState<TeamStatus[]>([]);
    const dispatch = useDispatch();
    const [activeIdx, setActiveIdx] = useState<number>(teams.length-1);
    const [activeRevelate, setActiveRevelate] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (teams.length === 0) location.reload()
        setTeamsCopy(teams)
    }, [teams]);

    const revelateNextSubmission = (teamStatus : TeamStatus) => {
        for (const result of teamStatus.results) {
            if (result.frozenSubmissions.length == 0) continue;
            dispatch(popLastFrozenSubmission(teamStatus))
        }
    }

    const revelate = () => {
        if (teamsCopy[activeIdx].results.reduce((prevRes, res) => prevRes + res.frozenSubmissions.length, 0) == 0) {
            if (activeIdx-1 < 0) setActiveRevelate(true)
            setActiveIdx(activeIdx-1);
            console.log(activeIdx)
        } else {
            revelateNextSubmission(teamsCopy[activeIdx])
        }
    }

    const terminateContest = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="pl-10 flex justify-center flex-col items-center">
            {/* Contest data */}
            <div className="flex felx-row space-x-8 p-9 h-[200px] w-[1000px]">
                <div className="flex flex-col space-y-3 w-[50%] rounded-md">
                    <h1 className="text-4xl font-bold text-white"> Name: {contest.name}</h1>
                    <h1 className="text-2xl text-white"> Duration: {contest.durationMinutes} </h1>
                    <h1 className="text-2xl text-white"> Frozen time before end: {contest.frozenMinutes} </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-[35vw] h-full text-center rounded-lg text-5xl">
                    <button
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                        onClick={revelate}
                        disabled={activeRevelate}
                    >
                        +1
                    </button>
                    <button
                        className={"transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black" + (!activeRevelate ? "" : " animate-[lights_1s_infinite]")}
                        onClick={terminateContest}
                    >
                        Terminate
                    </button>
                </div>
            </div>
            {/* Table */}
            <div>
                {/* Header row */}
                <div className="flex flex-row space-x-4 text-[25px] ">
                    <div className="w-96 h-20 flex items-center justify-center text-center"
                         style={{borderRadius: '5px'}}>
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
                    <FlipMove
                        duration={1000}
                        staggerDurationBy="30"
                        children={teamsCopy.map((teamStatus, index) => (
                            <TeamRow key={teamStatus.team.shortName} pos={index+1} teamStatus={teamStatus} isRevelator={true} lights={activeIdx == index}/>
                        ))}
                    />
                </div>
            </div>
        </div>
    );
}

export default Revelator;