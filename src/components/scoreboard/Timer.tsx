interface MyTimerProps {
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
}

const Timer: React.FC<MyTimerProps> = ({ hours, minutes, seconds, isRunning })=> {
    return (
        <div className="flex flex-col items-center justify-center w-[30vw] h-[35vh] text-center border-2 border-white rounded-lg p-10">
            <p>Tiempo restante:</p>
            <div style={{fontSize: '100px'}}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'El tiempo esta corriendo' : ''}</p>
        </div>
    )
}

export default Timer;