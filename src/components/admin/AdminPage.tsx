import style from "./admin.module.css"
import {ReactElement} from "react";
/*
    Para agregar un resultado -> dispatch(add(resultado))
    Para limpiar -> disptach(clear())
 */
const AdminPage = () : ReactElement => {
    return (
        <>
            <h1 className={style.titulo} >Login de admin</h1>
            <button onClick={() => {return}}>Agregar</button>
            <button onClick={() => {return}}>Limpiar</button>
        </>
    );
}

export default AdminPage;