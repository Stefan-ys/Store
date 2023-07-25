import React, {useEffect, useState} from "react";
import HomeService from "../../../services/HomeService";
import Cookies from "js-cookie";

function Home() {

    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {

        setUsername(Cookies.get("username"));

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
            <h1>Welcome, {!username ? "guest" : username}</h1>
            <h2>{welcomeMessage}</h2>
        </div>
    )
}

export default Home;