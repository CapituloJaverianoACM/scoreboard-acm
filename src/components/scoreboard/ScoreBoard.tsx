import {ReactElement} from "react";
import {useSelector} from "react-redux";
import ScoreboardMessage from "../../utils/types/scoreboard.ts";
const ScoreBoard = () : ReactElement => {

    const resultsList : ScoreboardMessage[] = useSelector(state => state.results.value);
    console.log(`Este es el tam ${resultsList.length}`)
    return (
        <>
            <h1>Tabla de posiciones</h1>
            {
                resultsList.map(el => <li>{el.type} - {el.payload as string}</li>)
            }
        </>
    );
}

export default ScoreBoard;