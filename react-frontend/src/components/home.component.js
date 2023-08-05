import React, {useState} from "react";
import AuthUtil from "../utils/auth.uitil";

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

export default Home;