import React, {useEffect, useState} from "react";
import HomeService from "../../../services/HomeService";


function Home() {

    const [welcomeMessage, setWelcomeMessage] = useState("");

    useEffect(() => {
        HomeService()
            .then((response) => {
                setWelcomeMessage(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Welcome</h1>
            <h2>{welcomeMessage}</h2>
        </div>
    )
}

export default Home;