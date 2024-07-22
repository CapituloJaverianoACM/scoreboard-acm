import { ReactElement } from "react";
import Spline from "@splinetool/react-spline";
import Contributor from './Contributor.tsx'
import { useNavigate } from 'react-router-dom'
import './landing.css'

const Landing = () : ReactElement => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/create")
    }

    return (
        <div className="text-white">
            <div className="relative h-[85vh] flex justify-evenly items-center text-white">
                <Spline scene="https://draft.spline.design/Z9xDmSaonQHEy5U0/scene.splinecode"/>
                <div data-aos="fade-left" data-aos-duration="700"  className="text-white text-4xl absolute translate-x-6 top-[30%] right-[45%]  text-center p-10">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <h1>Create your contest scoreboard</h1>
                        <button
                            className="transition duration-500 w-[10vw] text-xl p-3 border-2 rounded-full hover:bg-white hover:text-black"
                            onClick={handleClick}
                        >
                            Create
                        </button>
                    </div>
                </div>

            </div>
            <div className="flex justify-center items-center">
                <a aria-disabled={true} className="scrollDown">
                    <span></span>
                </a>
            </div>

            <div data-aos="fade-right" data-aos-duration="700"
                 className="p-20 flex justify-center items-center flex-col">
                <div className="flex justify-center items-center">
                    <h1 className="text-5xl">Contributors</h1>
                </div>
                <div className="flex justify-center items-center pt-32">
                    <Contributor/>
                </div>
            </div>
        </div>
    );
}

export default Landing;