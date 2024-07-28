import { ReactElement } from "react";
import { TeamResult } from "../../../utils/types/contest";

const TeamResults = (prop : { result : TeamResult }): ReactElement => {
    let baseClasses = "border w-20 h-20 flex items-center justify-center text-center";
    const result = prop.result;
    switch (result.status) {
        case "AC":
            return (
                <div className={`${baseClasses} border-white text-white`}>
                    -
                </div>
            );
        case "SOLVED":
            return (
                <div className={`${baseClasses} border-green-500 text-green-500`}>
                    + {result.tries} <br></br>
                    {/* TODO: Calcular los minutos, los mismos del penalty */}
                    {new Date(result.acceptedTimeStamp).getMinutes()}
                </div>
            );
        case "PENDING":
            return (
                <div className={`${baseClasses} border-yellow-500 text-yellow-500`}>
                    ? <br></br>
                    (0)
                </div>
            );
        case "WA":
            return (
                <div className={`${baseClasses} border-red-500 text-red-500`}>
                    x <br></br>
                    ({result.tries})
                </div>
            );
    }
}

export default TeamResults;