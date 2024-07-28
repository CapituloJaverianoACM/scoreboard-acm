import { ReactElement } from "react";
import { TeamResult } from "../../../utils/types/contest";

const TeamResults = (prop : { result : TeamResult }): ReactElement => {
    let baseClasses = "border w-20 h-20 flex items-center justify-center text-center";
    const result = prop.result;
    const minutes = Math.floor(result.seconds / 60);
    const hours = Math.floor(minutes / 60);
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
                    + {result.tries > 0 ? result.tries : ""} <br></br>
                    {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
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
                    WA <br></br>
                    ({result.tries})
                </div>
            );
    }
    return <div></div>;
}

export default TeamResults;