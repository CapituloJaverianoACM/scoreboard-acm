import { forwardRef } from "react";
import { TeamStatus } from "../../../utils/types/contest";
import TeamResults from "./TeamResults";
const TeamRow = forwardRef<HTMLDivElement, { pos:number, teamStatus : TeamStatus, isRevelator: boolean, lights: boolean }> ((prop, ref)  => {
    const teamStatus : TeamStatus = prop.teamStatus;
    const pos : number = prop.pos;
    return (
        <div ref={ref} className={"mb-5"}>
            <div className="flex flex-row space-x-4">
                {/* Team row */}
                <div className="w-20 h-20 flex items-center justify-center text-center text-[25px] bg-[#075779] rounded-md">
                    {pos}
                </div>
                {/* Team data */}
                <div className="w-72 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md">
                    <div className="w-[30%] text-[#0b8bc2]">
                        <b>[ {teamStatus.team.shortName } ]</b> 
                    </div>
                    <div className="w-[50%]">
                        {teamStatus.team.name}
                    </div>
                </div>
                {/* Team problems solved */}
                <div className="w-20 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md">
                    {teamStatus.problemsSolved}
                </div>
                {/* Team penalty */}
                <div className="w-20 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md">
                    {teamStatus.penalty}
                </div>
                {/* Team results */}
                {teamStatus.results.map((result) => {
                        return <TeamResults result={result} frozenSubmissions={prop.isRevelator ? result.frozenSubmissions : []} />
                    })}
                {
                    prop.lights ? (
                        <div className="h-20 absolute bg-white w-full rounded-lg animate-[lights_1s_infinite] -z-10"> </div>
                    ) : ("")
                }
            </div>
        </div>
    );
})

export default TeamRow;