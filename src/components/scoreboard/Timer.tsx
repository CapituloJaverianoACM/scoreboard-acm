import { useSelector } from 'react-redux';

const Timer: React.FC = ()=> {
    const { seconds, minutes, hours, isRunning } = useSelector((state: any) => state.timer);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <p className='text-sm'>Tiempo restante:</p>
            <div>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p className='text-sm'>{isRunning ? 'El tiempo esta corriendo' : ''}</p>
        </div>
    )
}

export default Timer;