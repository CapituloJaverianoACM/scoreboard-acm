import {ReactElement, useState} from "react";
import { useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/20/solid";
import Timer from "../scoreboard/Timer";
import { useTimer } from 'react-timer-hook';
import { useNavigate } from "react-router-dom";


const JudgePage = () : ReactElement => {
    const navigate = useNavigate();

    const [firstTime, setFirstTime] = useState(true);

    // Obtenemos el estado del contest y del timer
    const contestData = useSelector((state: any ) => state.contest.value);
    const timerState = useSelector((state: any ) => state.contest.timerState);

    // const expiry = new Date();
    // expiry.setSeconds(expiry.getSeconds() + contestData.durationMinutes * 60);

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ 
        expiryTimestamp:  timerState.expiryTimestamp, 
        onExpire: () => alert('El contest ha finalizado'),
        autoStart: false 
    });

    return (
        <div className="text-white flex items-center justify-center h-[100vh] w-full px-20">
            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div>
                    <Timer 
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                        isRunning={isRunning} 
                    />
                </div>
                <div className="flex-1">
                    <p>Recent Submissions</p>
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div className="flex flex-col gap-3 h-[35vh] justify-center">
                    <button 
                        onClick={
                            isRunning ? pause : firstTime ? () => {
                                start()
                                setFirstTime(false)
                            } : resume
                        }
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                    >
                        {isRunning ? 'Pausar contest' : firstTime ? 'Iniciar contest' : 'Reanudar contest'}
                    </button>
                    <button 
                        onClick={() => {
                            const time = new Date();
                            time.setSeconds(time.getSeconds() + contestData.durationMinutes * 60);
                            restart(time, false);
                            setFirstTime(true);
                        }}
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
                        className="transition duration-500 w-[15vw] h-[12vh] text-xl p-3 border-2 rounded-full hover:bg-[#2596be] hover:text-white flex items-center justify-center">
                        <PlusIcon className="w-6 h-6 mr-2" />
                        Agregar veredicto
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JudgePage;