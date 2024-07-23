import { useTimer } from 'react-timer-hook';

interface MyTimerProps {
    expiryTimestamp: Date;
}

const Timer: React.FC<MyTimerProps> = ({expiryTimestamp})=> {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => alert('El contest ha finalizado') });
    return (
        <div className="flex flex-col items-center justify-center w-[30vw] h-[35vh] text-center border-2 border-white rounded-lg p-10">
            <p>Tiempo restante:</p>
            <div style={{fontSize: '100px'}}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
            }}>Restart</button> */}
        </div>
    )
}

export default Timer;