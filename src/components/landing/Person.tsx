import {ReactElement} from "react";

const Person = ({ person }) : ReactElement => {
    return (
        <a className="p-10" href={person.follow}>
            <div className="flex justify-center flex-col items-center gap-5">
                <img className="rounded-full max-h-36" src={person.picture} alt=""/>
                <h1>{person.name}</h1>
            </div>
        </a>
    );
}

export default Person;