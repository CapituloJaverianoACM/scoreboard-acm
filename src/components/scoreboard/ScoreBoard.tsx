import {ReactElement} from "react";
import {useSelector} from "react-redux";
import ScoreboardMessage from "../../utils/types/scoreboard.ts";
import {Contest, TeamStatus} from "../../utils/types/contest.ts";
import TeamRow from "./(team)/TeamRow.tsx";
import {useLocation} from "react-router-dom";
const ScoreBoard = () : ReactElement => {

    const resultsList : ScoreboardMessage[] = useSelector(state => state.results.value);
    // console.log(`Este es el tam ${resultsList.length}`)
    const location = useLocation();
    const contest = location.state?.contest;
    console.log(contest);

    const exampleTeamStatus : TeamStatus = {
        team: {
            name: "Equipo 1",
            shortName: "E1"
        },
        results: [
            {
                problem: {
                    name: "Problema 1",
                    letter: "A"
                },
                status: "AC",
                tries: 1,
                acceptedMinute: 10
            },
            {
                problem: {
                    name: "Problema 2",
                    letter: "B"
                },
                status: "SOLVED",
                tries: 2,
                acceptedMinute: 0
            },
            {
                problem: {
                    name: "Problema 3",
                    letter: "C"
                },
                status: "PENDING",
                tries: 2,
                acceptedMinute: 0
            },
            {
                problem: {
                    name: "Problema 4",
                    letter: "D"
                },
                status: "WA",
                tries: 2,
                acceptedMinute: 0
            }
        ],
        penalty: 0
    }

    return (
        <>
            <h1>Tabla de posiciones</h1>
            <TeamRow teamStatus={exampleTeamStatus} />
        </>
    );
}

export default ScoreBoard;