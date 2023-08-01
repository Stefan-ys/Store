import React, {useContext, useEffect, useState} from "react";
import HomeService from "../../../services/HomeService";
import AuthContext from "../../../context/AuthProvider";

function Home() {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [username, setUsername] = useState("");

    const {authData} = useContext(AuthContext);


    useEffect(() => {

        setUsername(authData.username);

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