import {ReactElement} from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const Template = (props) : ReactElement => {
    return (
        <div className="text-white">
            <Header />
            <div className="mt-[100px]">
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default Template;