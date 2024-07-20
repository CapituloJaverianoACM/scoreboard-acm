import { ReactElement } from "react";
import { TeamStatus } from "../../../utils/types/contest";
import TeamResults from "./TeamResults";

const TeamRow = (prop : { teamStatus : TeamStatus }) : ReactElement => {
    const teamStatus = prop.teamStatus;

    return (
        <div>
            <div className="flex flex-row space-x-4">
                <div className=" h-20 flex items-center justify-center text-center">
                    {teamStatus.team.name} - [ {teamStatus.team.shortName } ]
                </div>
                {teamStatus.results.map((result) => {
                    return <TeamResults result={result} />
                })}
            </div>
        </div>
    );
}

export default TeamRow;