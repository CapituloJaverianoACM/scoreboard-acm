import style from "./admin.module.css"
import {ReactElement} from "react";
import {useDispatch} from "react-redux";
import {add, clear} from "../../utils/store/resultsSlice.ts";

/*
    Para agregar un resultado -> dispatch(add(resultado))
    Para limpiar -> disptach(clear())
 */

const AdminPage = () : ReactElement => {

    const dispatch = useDispatch();

    const handleEvent = (e) => {
        dispatch(add("si"))
    }

    return (
        <>
            <h1 className={style.titulo} >Login de admin</h1>
            <button onClick={handleEvent}>Agregar</button>
            <button onClick={() => {
                dispatch(clear())
            }}>Limpiar</button>
        </>
    );
}

export default AdminPage;