import { useSelector } from 'react-redux';

const Timer: React.FC = ()=> {
    const { seconds, minutes, hours, isRunning } = useSelector((state: any) => state.timer);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <p className='text-sm'>Tiempo restante:</p>
            <div>
                <span>{String(hours).padStart(2, '0')}</span>:<span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
            </div>
            <p className='text-sm'>{isRunning ? 'El tiempo esta corriendo' : ''}</p>
        </div>
    )
}

export default Timer;