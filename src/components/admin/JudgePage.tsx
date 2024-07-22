import {ReactElement} from "react";

const JudgePage = () : ReactElement => {
    return (
        <div className="text-white flex items-center justify-center h-[100vh] w-full px-20">
            <div className="w-full h-full flex flex-col items-center justify-evenly">
                <div>
                    <p>Timer</p>
                </div>
                <div>
                    <p>Recent Submissions</p>
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-evenly">
                <div className="flex flex-col">
                    <button>Iniciar contest</button>
                    <button>Pausar contest</button>
                    <button>Ir al revelator</button>
                </div>
                <div className="flex items-center justify-center">
                    <button>Agregar veredicto</button>
                </div>
            </div>
        </div>
    );
}

export default JudgePage;