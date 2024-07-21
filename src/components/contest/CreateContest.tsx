import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProblem } from "../../utils/store/problemSlice";
import { Problem } from "../../utils/types/contest";
import {RootState} from "@reduxjs/toolkit/query";

const CreateContest = (): ReactElement => {
    const dispatch = useDispatch();
    const problems = useSelector((state: RootState) => {
        return state.problems.value;
    });
    const [problemLetter, setProblemLetter] = useState<string>("");
    const [problemName, setProblemName] = useState<string>("");

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

    const handleSubmit = () => {
        if (validateProblemLetter(problemLetter) && problemName.length > 0){
            const problem: Problem = {
                letter: problemLetter,
                name: problemName,
            };
            dispatch(addProblem(problem));
            console.log("Added problem", problem);
            setProblemLetter("");
            setProblemName("");
        }
        else{
            console.log("Invalid problem letter or name");
        }
    };

    return (
        <div className="relative h-[85vh] flex flex-col justify-evenly items-center text-white">
            <h1 className="text-4xl">Create Contest</h1>
            <div className="mt-4">
                <h2 className="text-2xl">Problems List</h2>
                <ul>
                    {problems.map((problem, index) => (
                        <li key={index}>
                            {problem.letter}: {problem.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center">
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

        </div>
    );
};

export default CreateContest;
