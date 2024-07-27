import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProblem, clearProblems } from "../../utils/store/problemSlice";
import { Problem, Team } from "../../utils/types/contest";
import { addTeam, clearTeams } from "../../utils/store/teamSlice";
import { useNavigate } from "react-router-dom";
import { addTeamStatus, clearTeamStatus } from "../../utils/store/teamStatusSlice";
import Modal from 'react-modal';
import { setContest } from "../../utils/store/contestSlice";

const CreateContest = (): ReactElement => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [teams, setTeams] = useState<Team[]>([]);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [problemLetter, setProblemLetter] = useState<string>("");
    const [problemName, setProblemName] = useState<string>("");
    const [errorMessageProblem, setErrorMessageProblem] = useState<string>("");
    const [teamName, setTeamName] = useState<string>("");
    const [teamShortName, setTeamShortName] = useState<string>("");
    const [errorMessageTeam, setErrorMessageTeam] = useState<string>("");
    const [modalProblemIsOpen, setModalProblemIsOpen] = useState(false);
    const [modalTeamIsOpen, setModalTeamIsOpen] = useState(false);
    const [contestName, setContestName] = useState<string>("");
    const [contestDuration, setContestDuration] = useState<string>("");
    const [contestFrozenTime, setContestFrozenTime] = useState<string>("");
    const [errorContestData, setErrorContestData] = useState<string>("");
    const [contestActive, setContestActive] = useState<boolean>(false);

    useEffect(() => {
        const existingContest = localStorage.getItem("contestActive");
        if (existingContest) {
            setContestActive(true);
        }
    }, []);

    const handleContestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContestName(e.target.value);
    };

    const handleContestDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContestDuration(e.target.value);
    };

    const handleContestFrozenTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContestFrozenTime(e.target.value);
    };

    const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblemLetter(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblemName(e.target.value);
    };

    function validateProblemLetter(problemLetter: string): boolean {
        if (problemLetter.length !== 1) {
            return false;
        }
        return problemLetter.charCodeAt(0) - "A".charCodeAt(0) === problems.length;
    }

    const handleAddProblem = () => {
        const problem: Problem = {
            letter: problemLetter,
            name: problemName,
        };
        setProblems([...problems, problem]);
        setProblemLetter("");
        setProblemName("");
        setErrorMessageProblem("");
    };

    const openModalProblem = () => {
        setModalProblemIsOpen(true);
    };

    const afterOpenModalProblem = () => {
        setProblemLetter("");
        setProblemName("");
        setErrorMessageProblem("");
    };

    const closeModalAddProblem = () => {
        if (!validateProblemLetter(problemLetter)) {
            setErrorMessageProblem(`Wrong letter, expected letter: ${String.fromCharCode("A".charCodeAt(0) + problems.length)}`);
            return;
        } else if (problemName.length <= 0) {
            setErrorMessageProblem("Problem name is required");
            return;
        } else {
            handleAddProblem();
            setModalProblemIsOpen(false);
        }
    };

    const closeModalWithoutAddProblem = () => {
        setModalProblemIsOpen(false);
    };

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(e.target.value);
    };

    const handleTeamShortNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamShortName(e.target.value);
    };

    const handleCreateTeam = () => {
        const team: Team = {
            shortName: teamShortName,
            name: teamName,
        };
        setTeams([...teams, team]);
        setTeamShortName("");
        setTeamName("");
        setErrorMessageTeam("");
    };

    const openModalTeam = () => {
        setModalTeamIsOpen(true);
    };

    const closeModalAddTeam = () => {
        if (teamShortName.length <= 0 && teamName.length <= 0) {
            setErrorMessageTeam("Team name and short name are required");
        } else if (teamShortName.length <= 0) {
            setErrorMessageTeam("Team short name is required");
        } else if (teamName.length <= 0) {
            setErrorMessageTeam("Team name is required");
        } else if (teamNameExists(teamName)) {
            setErrorMessageTeam("Team name already exists");
        } else {
            handleCreateTeam();
            setModalTeamIsOpen(false);
        }
    };

    function teamNameExists(teamName: string): boolean {
        return teams.some(team => team.name === teamName);
    }

    const closeModalWithoutAddTeam = () => {
        setModalTeamIsOpen(false);
    };

    const afterOpenModalTeam = () => {
        setTeamName("");
        setTeamShortName("");
        setErrorMessageTeam("");
    };

    const handleContestValidations = () => {
        if (contestName.length <= 0) {
            setErrorContestData("Contest name is required");
            return false;
        }
        if (contestDuration.length <= 0 || parseInt(contestDuration) <= 0) {
            setErrorContestData("Contest duration must be greater than 0");
            return false;
        }
        if (contestFrozenTime.length <= 0 || parseInt(contestFrozenTime) <= 0) {
            setErrorContestData("Contest frozen time must be greater than 0");
            return false;
        }
        if (parseInt(contestDuration) <= parseInt(contestFrozenTime)) {
            setErrorContestData("Frozen time must be less than contest duration");
            return false;
        }
        if (problems.length === 0) {
            setErrorContestData("At least one problem is required");
            return false;
        }
        if (teams.length === 0) {
            setErrorContestData("At least one team is required");
            return false;
        }
        return true;
    };

    const handleCreateContest = () => {
        if (contestActive) {
            setErrorContestData("A contest is already active. Please end the current contest before creating a new one.");
            return;
        }

        if (!handleContestValidations()) {
            return;
        }

        // Delete all the previous data from the store
        dispatch(clearTeams());
        dispatch(clearProblems());
        dispatch(clearTeamStatus());

        for (const team of teams) {
            const results = problems.map(problem => ({
                problem,
                tries: 0,
                acceptedMinute: 0,
                status: "AC"
            }));
            dispatch(addTeamStatus({
                team,
                results,
                penalty: 0
            }));
        }

        dispatch(setContest({
            name: contestName,
            durationMinutes: parseInt(contestDuration),
            frozenMinutes: parseInt(contestFrozenTime),
        }));

        problems.forEach(problem => dispatch(addProblem(problem)));
        teams.forEach(team => dispatch(addTeam(team)));

        localStorage.setItem("contestActive", JSON.stringify({
            contestName,
            contestDuration,
            contestFrozenTime,
            problems,
            teams
        }));

        // Redirect to /judge if it is not possible to navigate to the main page
        if (navigate("/judge", { replace: true }) === undefined) {
            navigate("/", { replace: true });
        }

        window.open("/scoreboard", "_blank");
    };

    return (
        <div className="flex-grow flex flex-col justify-center items-center text-white mt-12">
            <div className="w-full px-12 mb-8">
                <h2 className="text-2xl mb-4">Create Contest</h2>
                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Contest Name"
                        className="p-2 bg-gray-200 text-black border border-gray-400 rounded"
                        value={contestName}
                        onChange={handleContestNameChange}
                    />
                    <input
                        type="number"
                        placeholder="Duration of contest (Minutes)"
                        className="p-2 bg-gray-200 text-black border border-gray-400 rounded"
                        value={contestDuration}
                        onChange={handleContestDurationChange}
                    />
                    <input
                        type="number"
                        placeholder="Frozen Time before end (Minutes)"
                        className="p-2 bg-gray-200 text-black border border-gray-400 rounded"
                        value={contestFrozenTime}
                        onChange={handleContestFrozenTimeChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full px-12">
                <div>
                    <h2 className="text-2xl mb-2">Problems List</h2>
                    <ul className="max-h-[42vh] overflow-y-auto grid grid-cols-2 gap-4">
                        {problems.map((problem, index) => (
                            <li key={index} className="bg-gray-800 p-2 rounded mb-2">
                                {problem.letter}: {problem.name}
                            </li>
                        ))}
                    </ul>
                    <button onClick={openModalProblem} className="p-2 bg-[#0b8bc29f] rounded text-white mt-4">
                        Add Problem
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl mb-2">Teams List</h2>
                    <ul className="max-h-[42vh] overflow-y-auto grid grid-cols-2 gap-4">
                        {teams.map((team, index) => (
                            <li key={index} className="bg-gray-800 p-2 rounded mb-2">
                                {team.shortName}: {team.name}
                            </li>
                        ))}
                    </ul>
                    <button onClick={openModalTeam} className="p-2 bg-[#0b8bc29f] rounded text-white mt-4">
                        Add Team
                    </button>
                </div>
            </div>

            <Modal
                isOpen={modalProblemIsOpen}
                onAfterOpen={afterOpenModalProblem}
                onRequestClose={closeModalAddProblem}
                contentLabel="Add Problem Modal"
                className="w-[45%] md:w-[45%] lg:w-[25%] h-[45%] p-4 mx-auto my-8 bg-black border-4 border-white rounded-lg flex flex-col justify-center items-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex flex-col items-center mt-4 w-full">
                    <h2 className="text-2xl mb-2 text-white">Enter the details of the problem.</h2>
                    <input
                        type="text"
                        placeholder="Problem Letter"
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        value={problemLetter}
                        onChange={handleLetterChange}
                    />
                    <input
                        type="text"
                        placeholder="Problem Name"
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        value={problemName}
                        onChange={handleNameChange}
                    />
                    {errorMessageProblem && (
                        <p className="text-red-300">{errorMessageProblem}</p>
                    )}
                    <div className="flex space-x-2 w-full justify-center mt-8">
                        <button
                            onClick={closeModalAddProblem}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Add Problem
                        </button>
                        <button
                            onClick={closeModalWithoutAddProblem}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalTeamIsOpen}
                onAfterOpen={afterOpenModalTeam}
                onRequestClose={closeModalAddTeam}
                contentLabel="Add Team Modal"
                className="w-[45%] md:w-[45%] lg:w-[25%] h-[45%] p-4 mx-auto my-8 bg-black border-4 border-white rounded-lg flex flex-col justify-center items-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex flex-col items-center mt-4 w-full">
                    <h2 className="text-2xl mb-2 text-white">Enter the details of the team.</h2>
                    <input
                        type="text"
                        placeholder="Team Short Name"
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        value={teamShortName}
                        onChange={handleTeamShortNameChange}
                    />
                    <input
                        type="text"
                        placeholder="Team Name"
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        value={teamName}
                        onChange={handleTeamNameChange}
                    />
                    {errorMessageTeam && (
                        <p className="text-red-300">{errorMessageTeam}</p>
                    )}
                    <div className="flex space-x-2 w-full justify-center mt-8">
                        <button
                            onClick={closeModalAddTeam}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Add Team
                        </button>
                        <button
                            onClick={closeModalWithoutAddTeam}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </Modal>

            <button
                onClick={handleCreateContest}
                className="px-8 py-3 bg-[#0b8bc29f] hover:bg-[#0b8bc29f] text-white font-semibold rounded-lg shadow-md mt-12 transition duration-300 ease-in-out transform hover:scale-105"
            >
                Create Contest
            </button>

            {errorContestData && (
                <p className="text-red-200 mt-4">{errorContestData}</p>
            )}
        </div>
    );
};

export default CreateContest;
