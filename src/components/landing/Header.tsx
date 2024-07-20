import {ReactElement} from "react";
import logo from '../../assets/ACMLogo.png'
const Header = () : ReactElement => {
    return (<>
        <div className="absolute top-0 w-[100%] z-20">
            <div className="text-white flex justify-center items-center p-[20px]">
                <img className="h-[55px] w-[55px]" src={logo} alt=""/>
                <h1 className="p-5 text-2xl">Contest Scoreboard</h1>
            </div>
        </div>
    </>)
}

export default Header;