import { ReactElement } from "react";
import { TeamStatus } from "../../../utils/types/contest";
import TeamResults from "./TeamResults";

const TeamRow = (prop : { pos:number, teamStatus : TeamStatus }) : ReactElement => {
    const teamStatus : TeamStatus = prop.teamStatus;
    const pos : number = prop.pos;
    return (
        <div>
            <div className="flex flex-row space-x-4">
                <div className="w-20 h-20 flex items-center justify-center text-center text-[25px] bg-[#0b8bc29f] rounded-md">
                    {pos}
                </div>
                <div className="w-72 h-20 flex items-center justify-center text-center bg-[#ffffff18] rounded-md">
                    <div className="w-[30%] text-[#0b8bc2]">
                        <b>[ {teamStatus.team.shortName } ]</b> 
                    </div>
                    <div className="w-[50%]">
                        {teamStatus.team.name}
                    </div>
                </div>
                {teamStatus.results.map((result) => {
                        return <TeamResults result={result} />
                    })}
            </div>
        </div>
    );
}

export default TeamRow;