import {ReactElement} from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const Template = (props) : ReactElement => {
    return (
        <div className="text-white">
            <Header />
            {props.children}
            <Footer />
        </div>
    );
}

export default Template;