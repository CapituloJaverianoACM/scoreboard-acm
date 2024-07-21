import {ReactElement} from "react";
import {useSelector} from "react-redux";
import ScoreboardMessage from "../../utils/types/scoreboard.ts";
import {Contest, Problem, TeamStatus} from "../../utils/types/contest.ts";
import TeamRow from "./(team)/TeamRow.tsx";
import {useLocation} from "react-router-dom";
const ScoreBoard = () : ReactElement => {

    const resultsList : ScoreboardMessage[] = useSelector((state : any) => state.results.value);
    // console.log(`Este es el tam ${resultsList.length}`)
    const location = useLocation();
    const contest = location.state?.contest;
    console.log(contest);

    const teams : TeamStatus[] = useSelector((state : any) => state.teamStatus.value);
    const problems : Problem[] = useSelector((state : any) => state.problems.value);

    return (
        <div className="p-50">
            <h1 className="p-5 text-2xl">Tabla de posiciones</h1>
            {/* Header row */}
            <div className="flex flex-row space-x-4 text-[25px] ">
                <div className="w-96 h-20 flex items-center justify-center text-center" style={{borderRadius: '5px'}}>
                    Equipo
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
    );
}

export default ScoreBoard;