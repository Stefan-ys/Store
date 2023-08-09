import React, {useState} from "react";
import {withRouter} from "../common/with-router";


const Home = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [username, setUsername] = useState("");

    setWelcomeMessage("spam")
    setUsername("asdasd");

    return (
        <div>
            <h1>Welcome, {!username ? "guest" : username}</h1>
            <h2>{welcomeMessage}</h2>
        </div>
    );
}

export default withRouter(Home);