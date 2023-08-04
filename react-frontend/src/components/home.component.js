import React, {useEffect, useState} from "react";
import HomeService from "../services/home.service";
import AuthUtil from "../utils/auth.uitil";

const Home = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [username, setUsername] = useState("");

    if(AuthUtil.isLoggedIn()){
        setUsername(AuthUtil.getUsername);
    }

    useEffect(() => {


        return (
            <div>
                <h1>Welcome, {!username ? "guest" : username}</h1>
                <h2>{welcomeMessage}</h2>
            </div>
        );
    });
}

export default Home;