import { useSelector } from 'react-redux';
import {useEffect} from "react";
import { MoonIcon } from "@heroicons/react/24/solid";

const Timer: React.FC = ()=> {
    const { seconds, minutes, hours, isRunning, isFrozen } = useSelector((state: any) => state.timer);

    useEffect(() => {
        console.log(isFrozen)
    }, [isFrozen]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <p className='text-sm'>Time left:</p>
            <div>
                <span>{String(hours).padStart(2, '0')}</span>:<span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
            </div>
            <p className='text-sm'>{isFrozen ? 'Scoreboard frozen' : (
                isRunning ? 'Time is running' : ""
            )}</p>
            {isFrozen ? <MoonIcon /> : ""}
        </div>
    )
}

export default Timer;