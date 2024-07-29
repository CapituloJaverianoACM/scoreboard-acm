import {ReactElement} from "react";
import { Navigate } from "react-router-dom";

const RoutesGuard = (props : { outlet: ReactElement }) : ReactElement => {

    return (
        <>
            {
                localStorage.getItem("contestActive") == null ? <Navigate to={"/"} /> : props.outlet
            }
        </>
    );
}

export default RoutesGuard;