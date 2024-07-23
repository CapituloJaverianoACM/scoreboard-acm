import {ReactElement} from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Timer from "../scoreboard/Timer";

const JudgePage = () : ReactElement => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 20);
    return (
        <div className="text-white flex items-center justify-center h-[100vh] w-full px-20">
            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div>
                    <Timer expiryTimestamp={time} />
                </div>
                <div className="flex-1">
                    <p>Recent Submissions</p>
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-center pt-24 gap-12">
                <div className="flex flex-col gap-3 h-[35vh] justify-center">
                    <button
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black">
                        Iniciar contest
                    </button>
                    <button
                        className="transition duration-500 w-[15vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black">
                        Pausar contest
                    </button>
                    <button
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