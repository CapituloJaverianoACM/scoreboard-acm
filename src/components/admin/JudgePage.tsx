import {ReactElement, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/20/solid";
import Timer from "../scoreboard/Timer";
import { useTimer } from 'react-timer-hook';
import { useNavigate } from "react-router-dom";
import { pauseTimer, resetTimer, resumeTimer, setTimer, startTimer } from "../../utils/store/timerSlice";
import Modal from 'react-modal';

const JudgePage = () : ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isRunning } = useSelector((state: any) => state.timer);
    const contestData = useSelector((state: any ) => state.contest.value);

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + contestData.durationMinutes * 60); 
    
    //Estados del componente
    const [initialStateTimer, setInitialStateTimer] = useState(true);

    const [modalProblemIsOpen, setModalProblemIsOpen] = useState(false);


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
        onExpire: () => alert('El contest ha finalizado'),
        autoStart: false 
    });

    // useEffect(() => {
    //     if (isRunning && !timerIsRunning) {
    //         resume();
    //     } else if (!isRunning && timerIsRunning) {
    //         pause();
    //     }
    // }, [isRunning, timerIsRunning, resume, pause]);
    
    useEffect(() => {
        dispatch(setTimer({ seconds: timerSeconds, minutes: timerMinutes, hours: timerHours }));
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
        dispatch(resetTimer({ seconds: timeReseted.getSeconds(), minutes: timeReseted.getMinutes(), hours: timeReseted.getHours() }));
        restart(timeReseted, false);
        setInitialStateTimer(true);
    };

    // --
    // -- MODAL --
    const openModalProblem = () => {
        setModalProblemIsOpen(true);
    };
    const afterOpenModal = () => {
        // setProblemLetter("");
        // setProblemName("");
        // setErrorMessageProblem("");
    };
    const closeModalAdd = () => {
        // if (!validateProblemLetter(problemLetter)) {
        //     setErrorMessageProblem(`Wrong letter, expected letter: ${String.fromCharCode("A".charCodeAt(0) + problems.length)}`);
        //     return;
        // } else if (problemName.length <= 0) {
        //     setErrorMessageProblem("Problem name is required");
        //     return;
        // } else {
        //     handleAddProblem();
        //     setModalProblemIsOpen(false);
        // }
    };
    const closeModalWithoutAddProblem = () => {
        setModalProblemIsOpen(false);
    };
    // -- 

    return (
        <div className="text-white flex items-center justify-center h-[100vh] w-full px-20">
            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div className="w-[35vw] h-[30vh] text-center border-2 border-white rounded-lg p-10 text-8xl">
                    <Timer />
                </div>
                <div className="flex-1">
                    <p>Recent Submissions</p>
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
                        {isRunning ? 'Pausar contest' : initialStateTimer ? 'Iniciar contest' : 'Reanudar contest'}
                    </button>
                    <button 
                        onClick={!initialStateTimer ? handleReset : () => {}}
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                    >
                        Reiniciar contest
                    </button>
                    <button
                    onClick={() => navigate('/revelator')}
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black">
                        Ir al revelator
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={openModalProblem}
                        className="transition duration-500 w-[15vw] h-[12vh] text-xl p-3 border-2 rounded-full hover:bg-[#2596be] hover:text-white flex items-center justify-center">
                        <PlusIcon className="w-6 h-6 mr-2" />
                        Agregar veredicto
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalProblemIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalAdd}
                contentLabel="Add Verdict Modal"
                className="w-[45%] md:w-[45%] lg:w-[25%] h-[45%] p-4 mx-auto my-8 bg-black border-4 border-white rounded-lg flex flex-col justify-center items-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <form className="flex flex-col items-center mt-4 w-full">
                    <h2 className="text-2xl mb-2 text-white">Agregue su veredicto.</h2>
                    {/* Team */}
                    <select
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        required
                    >
                        <option value="" disabled selected>Select a team</option>
                    </select>
                    {/* Problem */}
                    <select
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        required
                    >
                        <option value="" disabled selected>Select a problem</option>
                    </select>
                    {/* Verdict */}
                    <select
                        className="p-2 m-2 w-[85%] bg-gray-200 text-black border border-gray-400 rounded"
                        required
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
                            type="submit"
                            onClick={closeModalAdd}
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
                </form>
            </Modal>
        </div>
    );
}

export default JudgePage;