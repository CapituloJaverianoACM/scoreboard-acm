import {ReactElement} from "react";
import {useSelector} from "react-redux";
const ScoreBoard = () : ReactElement => {

    const resultsList : string[] = useSelector(state => state.results.value);
    console.log(`Este es el tam ${resultsList.length}`)
    return (
        <>
            <h1>Tabla de posiciones</h1>
            {
                resultsList.map(el => <li>{el}</li>)
            }
        </>
    );
}

export default ScoreBoard;