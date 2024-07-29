import {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PlusIcon} from "@heroicons/react/20/solid";
import Timer from "../scoreboard/Timer";
import {useTimer} from 'react-timer-hook';
import {useNavigate} from "react-router-dom";
import {addTeamResult, reverseFrozenSubmissions} from "../../utils/store/teamStatusSlice.ts";
import {pauseTimer, resetTimer, resumeTimer, setTimer, startTimer} from "../../utils/store/timerSlice";
import Modal from 'react-modal';
import {Problem, Submission, Team} from "../../utils/types/contest.ts";
import { addSubmission } from "../../utils/store/submissionsSlice.ts";
import FlipMove from "react-flip-move";

const JudgePage = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // En el Store de Team status se renderiza el scoreboard
    const {isRunning, seconds, minutes, hours, secondsPassed, isFrozen} = useSelector((state: any) => state.timer);
    const contestData = useSelector((state: any) => state.contest.value);
    const contestTeams = useSelector((state: any) => state.teams.value);
    const contestProblems = useSelector((state: any) => state.problems.value);
    const submissions = useSelector((state: any) => state.submissions.value);
    const expiryTimestamp = new Date();

    //Estados del componente
    const [initialStateTimer, setInitialStateTimer] = useState(true);
    const [modalProblemIsOpen, setModalProblemIsOpen] = useState(false);
    const [veredictTeam, setVeredictTeam] = useState<Team | null>(null);
    const [veredictProblem, setVeredictProblem] = useState<Problem | null>(null);
    const [veredictResult, setVeredictResult] = useState<string>("")

    if (hours == -1) {
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + contestData.durationMinutes * 60);
    } else {
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + seconds)
        expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + minutes)
        expiryTimestamp.setHours(expiryTimestamp.getHours()+hours)
    }

    useEffect(() => {
        const res = localStorage.getItem("contestActive")
        if (!res) {
            navigate("/create");
        }

        if (hours != -1) setInitialStateTimer(false);
    }, []);

    const {
        seconds: timerSeconds,
        minutes: timerMinutes,
        hours: timerHours,
        isRunning: timerIsRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            alert('El contest ha finalizado')
        },
        autoStart: isRunning
    });

    useEffect(() => {
        if (((secondsPassed) / 60) >= (contestData.durationMinutes - contestData.frozenMinutes)) {
            dispatch(setTimer({seconds: timerSeconds, minutes: timerMinutes, hours: timerHours, isFrozen: true}));
        } else {
            dispatch(setTimer({seconds: timerSeconds, minutes: timerMinutes, hours: timerHours, isFrozen: false}));
        }
    }, [timerSeconds, timerMinutes, timerHours, dispatch]);

    // -- TIMER --
    const handleStart = () => {
        dispatch(startTimer());
        start();
        setInitialStateTimer(false);
    };

    const handleResume = () => {
        dispatch(resumeTimer());
        resume();
    };

    const handlePause = () => {
        dispatch(pauseTimer());
        pause();
    };

    const handleReset = () => {
        const timeReseted = new Date();
        timeReseted.setSeconds(timeReseted.getSeconds() + contestData.durationMinutes * 60);
        restart(timeReseted, false);
        dispatch(resetTimer({
            seconds: timerSeconds,
            minutes: timerMinutes,
            hours: timerHours
        }));
        setInitialStateTimer(true);
    };

    // --
    // -- MODAL --
    const openModalProblem = () => {
        setModalProblemIsOpen(true);
    };
    const afterOpenModal = () => {
        setVeredictResult("");
        setVeredictTeam(null);
        setVeredictProblem(null);
    };
    const closeModalAdd = () => {
        console.log(veredictProblem)
        console.log(veredictTeam)
        console.log(veredictResult)

        const teamSubmission: Submission = {
            team: veredictTeam!.name,
            submission: {
                problem: veredictProblem!.name,
                result: veredictResult,
                seconds: secondsPassed,
                timeStamp: Date.now().toString(),
                isFrozen: isFrozen
            }
        }

        dispatch(addTeamResult(teamSubmission))
        dispatch(addSubmission(teamSubmission))
        setModalProblemIsOpen(false);
    }
    const closeModalWithoutAddProblem = () => {
        setModalProblemIsOpen(false);
    };


    const handleTerminate = () => {
        const timeReseted = new Date();
        restart(timeReseted, true);
        dispatch(resetTimer({
            seconds: timerSeconds,
            minutes: timerMinutes,
            hours: timerHours
        }));
    }

    const handleGoToRevelator = () => {
        dispatch(reverseFrozenSubmissions())
        navigate('/revelator')
    }
    return (
        <div className="text-white flex items-center justify-center h-[100vh] w-full px-20 mb-8">
            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div className="w-[35vw] h-[30vh] text-center border-2 border-white rounded-lg p-10 text-8xl">
                    <Timer />
                </div>

                <div className="w-[35vw] max-h-[60vh] text-center border-2 border-white rounded-lg p-4 flex flex-col">
                    <p className="text-2xl font-bold mb-4">Recent Submissions</p>
                    <div className="mb-2">
                        <div className="flex flex-row space-x-4 items-center justify-center text-center font-bold">
                            {/* Header Row */}
                            <div className="w-36 h-20 flex items-center justify-center text-left">
                                TEAM
                            </div>
                            <div className="w-36 h-20 flex items-center justify-center text-left">
                                PROBLEM
                            </div>
                            <div className="w-36 h-20 flex items-center justify-center text-left">
                                VEREDICT
                            </div>
                            <div className="w-36 h-20 flex items-center justify-center text-left">
                                MINUTE
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <FlipMove duration={1000} staggerDurationBy="30">
                            {submissions.map((submission, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex flex-row space-x-4 items-center justify-center text-center">
                                        {/* Team */}
                                        <div className="w-36 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md">
                                            <div className="text-[#0b8bc2]">
                                                <b>[ {submission.team} ]</b>
                                            </div>
                                        </div>
                                        {/* Problem */}
                                        <div className="w-36 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md">
                                            {submission.submission.problem}
                                        </div>
                                        {/* Veredict */}
                                        <div className={`w-36 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md ${submission.submission.result === "CORRECT" ? "text-green-500" : "text-red-500"}`}>
                                            {submission.submission.result}
                                        </div>
                                        {/* Time */}
                                        <div className="w-36 h-20 flex items-center justify-center text-center bg-[#171717] rounded-md">
                                            {Math.floor(submission.submission.seconds / 60)}:{String(submission.submission.seconds % 60).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </FlipMove>
                    </div>
                </div>
            </div>

            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div className="flex flex-col gap-3 h-[35vh] justify-center">
                    <button
                        onClick={
                            isRunning ? handlePause : initialStateTimer ? handleStart : handleResume
                        }
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                    >
                        {isRunning ? 'Pause contest' : initialStateTimer ? 'Start contest' : 'Resume contest'}
                    </button>
                    <button
                        onClick={handleTerminate}
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                    >
                        Finish contest
                    </button>
                    <button
                        onClick={!initialStateTimer ? handleReset : () => {
                        }}
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                    >
                        Restart contest
                    </button>
                    <button
                        disabled={timerMinutes+timerSeconds+timerHours != 0}
                        onClick={handleGoToRevelator}
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black">
                        Go to revelator
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        disabled={!isRunning}
                        onClick={openModalProblem}
                        className="transition duration-500 w-[15vw] h-[12vh] text-xl p-3 border-2 rounded-full hover:bg-[#2596be] hover:text-white flex items-center justify-center">
                        <PlusIcon className="w-6 h-6 mr-2"/>
                        Add veredict
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalProblemIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalWithoutAddProblem}
                ariaHideApp={false}
                contentLabel="Add Verdict Modal"
                className="w-[45%] md:w-[45%] lg:w-[25%] h-[45%] p-4 mx-auto my-8 bg-black border-4 border-white rounded-lg flex flex-col justify-center items-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex flex-col items-center mt-4 w-full">
                    <h2 className="text-2xl mb-2 text-white">Add a veredict.</h2>
                    {/* Team */}
                    <select
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        required
                        onChange={e => setVeredictTeam(contestTeams.find((t : Team) => {
                            return t.name == e.target.value
                        }))}
                    >
                        <option value="" key={""} disabled selected>Select a team</option>
                        {
                            contestTeams.map((team : Team) => {
                                return <option value={team.name} key={team.name}>[{team.shortName}]
                                    - {team.name}</option>
                            })
                        }
                    </select>
                    {/* Problem */}
                    <select
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        required
                        onChange={e => setVeredictProblem(contestProblems.find((t : Problem) => t.name == e.target.value))}
                    >
                        <option value="" key={""} disabled selected>Select a problem</option>
                        {
                            contestProblems.map((problem : Problem) => {
                                return <option
                                    value={problem.name}
                                    key={problem.name}
                                >{problem.letter} - {problem.name}</option>
                            })
                        }
                    </select>
                    {/* Verdict */}
                    <select
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        required
                        onChange={e => setVeredictResult(e.target.value)}
                    >
                        <option value="" disabled selected>Select a verdict</option>
                        <option value="CORRECT">Correct</option>
                        <option value="WA">Wrong Answer</option>
                        <option value="TLE">Time Limit Exceeded</option>
                    </select>
                    {/* {errorMessageProblem && (
                        <p className="text-red-300">{errorMessageProblem}</p>
                    )} */}
                    <div className="flex space-x-2 w-full justify-center mt-8">
                        <button
                            onClick={closeModalAdd}
                            className="p-2 w-[40%] bg-black border-2 border-white rounded-2xl text-white mt-4"
                        >
                            Add Veredict
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
        </div>
    );
    
    
}

export default JudgePage;