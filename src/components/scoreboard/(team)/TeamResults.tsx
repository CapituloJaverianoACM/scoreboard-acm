import { ReactElement } from "react";
import {Submission, TeamResult} from "../../../utils/types/contest";

const TeamResults = (prop : { result : TeamResult, frozenSubmissions: Submission[] }): ReactElement => {
    let baseClasses = "border w-20 h-20 flex items-center justify-center text-center rounded-lg";
    const { result, frozenSubmissions } = prop;
    let finalStatus = result.status;
    const minutes = Math.floor(result.seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (frozenSubmissions.length > 0) finalStatus = "PENDING"
    switch (finalStatus) {
        case "AC":
            return (
                <div className={`${baseClasses} border-white bg-black text-white`}>
                    -
                </div>
            );
        case "SOLVED":
            return (
                <div className={`${baseClasses} bg-green-500 border-transparent text-black`}>
                    + {result.tries > 0 ? result.tries : ""} <br></br>
                    {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                </div>
            );
        case "PENDING":
            return (
                <div className={`${baseClasses} bg-yellow-500 border-transparent text-black`}>
                    ? <br></br>
                    ({frozenSubmissions.length})
                </div>
            );
        case "WA":
            return (
                <div className={`${baseClasses} bg-red-500 border-transparent text-black`}>
                    WA <br></br>
                    ({result.tries})
                </div>
            );
    }
    return <div></div>;
}

export default TeamResults;