import React, {useState} from "react";


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