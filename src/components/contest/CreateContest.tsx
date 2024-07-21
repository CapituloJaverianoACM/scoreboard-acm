import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProblem } from "../../utils/store/problemSlice";
import { Problem, Team } from "../../utils/types/contest";
import { RootState } from "@reduxjs/toolkit/query";
import { addTeam } from "../../utils/store/teamSlice.ts";
import {useNavigate} from "react-router-dom";

const CreateContest = (): ReactElement => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const problems = useSelector((state: RootState) => {
        return state.problems.value;
    });

    const teams = useSelector((state: RootState) => {
        return state.teams.value;
    });

    // Interactive elements state
    const [problemLetter, setProblemLetter] = useState<string>("");
    const [problemName, setProblemName] = useState<string>("");

    const [teamName, setTeamName] = useState<string>("");
    const [teamShortName, setTeamShortName] = useState<string>("");

    // Handle changes in HTML Elements
    const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblemLetter(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblemName(e.target.value);
    };

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(e.target.value);
    };

    const handleTeamShortNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamShortName(e.target.value);
    };

    function validateProblemLetter(problemLetter: string): boolean {
        if (problemLetter.length !== 1) {
            return false;
        }
        return problemLetter.charCodeAt(0) - "A".charCodeAt(0) === problems.length;
    }

    const handleSubmit = () => {
        if (validateProblemLetter(problemLetter) && problemName.length > 0) {
            const problem: Problem = {
                letter: problemLetter,
                name: problemName,
            };
            dispatch(addProblem(problem));
            setProblemLetter("");
            setProblemName("");
        }
    };

    const handleCreateTeam = () => {
        if (teamShortName.length > 0 && teamName.length > 0) {
            const team: Team = {
                shortName: teamShortName,
                name: teamName,
            };
            dispatch(addTeam(team));
            setTeamShortName("");
            setTeamName("");
        }
    };

    const handleCreateContest = () => {
        navigate("/scoreboard");
        const newTab = window.open('/admin', '_blank');
        if (newTab) {
            newTab.focus();
        }
    }

    /*
    const handleCleanLocalStorage = () => {
        localStorage.clear();
    }
     */

    return (
        <div className="relative h-[85vh] flex flex-col justify-center items-center text-white mt-4">
            <div className="mt-4">
                <h2 className="text-2xl mb-2">Problems List</h2>
                <ul className="scroll-auto">
                    {problems.map((problem, index) => (
                        <li key={index} className="bg-gray-800 p-2 rounded">
                            {problem.letter}: {problem.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col items-center mt-4">
                <input
                    type="text"
                    placeholder="Problem Letter"
                    className="p-2 m-2 bg-gray-200 text-black border border-gray-400 rounded"
                    value={problemLetter}
                    onChange={handleLetterChange}
                />
                <input
                    type="text"
                    color={"black"}
                    placeholder="Problem Name"
                    className="p-2 m-2 bg-gray-200 text-black border border-gray-400 rounded"
                    value={problemName}
                    onChange={handleNameChange}
                />
                <button
                    onClick={handleSubmit}
                    className="p-2 bg-blue-500 rounded text-white"
                >
                    Add Problem
                </button>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl mb-2">Teams List</h2>
                <ul >
                    {teams.map((team, index) => (
                        <li key={index} className="bg-gray-800 rounded m-1.5 p-4">
                            {team.shortName}: {team.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col items-center mt-4 mb-4">
                <input
                    type="text"
                    placeholder="Short Team Name"
                    className="p-2 m-2 bg-gray-200 text-black border border-gray-400 rounded"
                    value={teamShortName}
                    onChange={handleTeamShortNameChange}
                />
                <input
                    type="text"
                    color={"black"}
                    placeholder="Team Name"
                    className="p-2 m-2 bg-gray-200 text-black border border-gray-400 rounded"
                    value={teamName}
                    onChange={handleTeamNameChange}
                />
                <button
                    onClick={handleCreateTeam}
                    className="p-2 bg-blue-500 rounded text-white"
                >
                    Add Team
                </button>
            </div>

            <div className="flex justify-center items-center">
            </div>

            <button
                className = "p-2 bg-red-500 rounded text-white"
                onClick={handleCreateContest}>
                Create Contest
            </button>
        </div>
    );
};

export default CreateContest;
