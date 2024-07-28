import {ReactElement, useEffect, useState} from "react";
import Person from "./Person.tsx";

const Contributor = () : ReactElement => {

    const [contributors, setContributors] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://api.github.com/repos/CapituloJaverianoACM/scoreboard-acm/contributors", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(contrib => {
                setContributors(contrib)
            })
            .catch(error => console.log(error))
    }, []);
    // avatar_url, html_url, login
    return (
        <>
            {
                contributors.map(contrib => <Person key={contrib.login} person={{
                    picture: contrib.avatar_url,
                    follow: contrib.html_url,
                    name: contrib.login
                }} />)
            }
        </>
    )
}

export default Contributor;