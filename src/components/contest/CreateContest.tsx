import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProblem } from "../../utils/store/problemSlice";
import { Problem, Team, TeamStatus } from "../../utils/types/contest";
import { RootState } from "@reduxjs/toolkit/query";
import { addTeam } from "../../utils/store/teamSlice.ts";
import { useNavigate } from "react-router-dom";
import { addTeamStatus, clearTeamStatus } from "../../utils/store/teamStatusSlice.ts";
import Modal from 'react-modal';

const CreateContest = (): ReactElement => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const teams: Team[] = useSelector((state: any) => state.teams.value);
    const problems: Problem[] = useSelector((state: any) => state.problems.value);
    const teamsStatus: TeamStatus[] = useSelector((state: any) => state.teamStatus.value);

    const [problemLetter, setProblemLetter] = useState<string>("");
    const [problemName, setProblemName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [teamName, setTeamName] = useState<string>("");
    const [teamShortName, setTeamShortName] = useState<string>("");

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

    const handleAddProblem = () => {
        if (!validateProblemLetter(problemLetter)){
            setErrorMessage(`Wrong problem letter, expected letter:  ${String.fromCharCode("A".charCodeAt(0) + problems.length)}`);
            return;
        }

        if (problemName.length <= 0) {
            setErrorMessage("Problem name is required");
            return;
        }

        const problem: Problem = {
            letter: problemLetter,
            name: problemName,
        };
        dispatch(addProblem(problem));
        setProblemLetter("");
        setProblemName("");
        setErrorMessage("");
    };

    const clearLocalStorage = () => {
        localStorage.clear();
    }

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

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const afterOpenModal = () => {}

    const closeModalAddProblem = () => {
        if (validateProblemLetter(problemLetter) && problemName.length > 0) {
            setModalIsOpen(false);
        }
        handleAddProblem();
    }

    const closeModalWithOutAddProblem = () => {
        setModalIsOpen(false);
    }

    const handleCreateContest = () => {
        dispatch(clearTeamStatus());
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            const results = [];
            for (let j = 0; j < problems.length; j++) {
                results.push({
                    problem: problems[j],
                    tries: 0,
                    acceptedMinute: 0,
                    status: "AC"
                });
            }
            dispatch(addTeamStatus({
                team: team,
                results: results,
                penalty: 0
            }));
        }

        const contest = {
            problems: problems,
            teams: teams,
            teamStatus: teamsStatus,
            teamResults: []
        };

        navigate("/scoreboard", { state: { contest: contest } });
    };

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

            <button onClick={openModal} className="p-2 bg-blue-500 rounded text-white mt-8">
                Add Problem
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalAddProblem}
                contentLabel="Add Problem Modal"
                className="w-[45%] md:w-[45%] lg:w-[25%] h-[45%] p-4 mx-auto my-8 bg-black border-4 border-white rounded-lg flex flex-col justify-center items-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex flex-col items-center mt-4 w-full">
                    <h2 className="text-2xl mb-2 text-white">Enter the details of the problem. </h2>
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
                    {errorMessage && (
                        <p className="text-red-300">{errorMessage}</p>
                    )}
                    <div className="flex space-x-2 w-full justify-center mt-8">
                        <button
                            onClick={closeModalAddProblem}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Add Problem
                        </button>
                        <button
                            onClick={closeModalWithOutAddProblem}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="mt-4">
                <h2 className="text-2xl mb-2">Teams List</h2>
                <ul>
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

            <button
                className="p-2 bg-red-500 rounded text-white"
                onClick={clearLocalStorage}
            >
                Create Contest
            </button>
        </div>
    );
};

export default CreateContest;
