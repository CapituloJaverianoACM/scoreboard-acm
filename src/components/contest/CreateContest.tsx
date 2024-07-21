import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store/store"; // Asegúrate de exportar RootState desde store
import { addProblem } from "../../utils/store/problemSlice";
import { Problem } from "../../utils/types/contest";

const CreateContest = (): ReactElement => {
    const dispatch = useDispatch();
    const problems = useSelector((state: RootState) => state.problems.value); // Selecciona el estado de los problemas
    const [problemLetter, setProblemLetter] = useState<string>("");
    const [problemName, setProblemName] = useState<string>("");

    const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblemLetter(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblemName(e.target.value);
    };

    const handleSubmit = () => {
        if (problemLetter.trim() && problemName.trim()) {
            const problem: Problem = {
                letter: problemLetter,
                name: problemName,
            };
            dispatch(addProblem(problem));
            console.log("Added problem", problem);
            setProblemLetter("");
            setProblemName("");
        }
    };

    return (
        <div className="relative h-[85vh] flex flex-col justify-evenly items-center text-white">
            <h1 className="text-4xl">Create Contest</h1>
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Problem Letter"
                    className="p-2 m-2"
                    value={problemLetter}
                    onChange={handleLetterChange}
                />
                <input
                    type="text"
                    placeholder="Problem Name"
                    className="p-2 m-2"
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
                <h2 className="text-2xl">Problems List</h2>
                <ul>
                    {problems.map((problem, index) => (
                        <li key={index}>
                            {problem.letter}: {problem.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CreateContest;
