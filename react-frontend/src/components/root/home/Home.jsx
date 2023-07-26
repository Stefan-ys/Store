import React, {useContext, useEffect, useState} from "react";
import HomeService from "../../../services/HomeService";
import AuthContext from "../../../context/AuthProvider";
import AuthenticationService from "../../../services/authentication/AuthenticationService";

function Home() {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [username, setUsername] = useState("");

    const {authData} = useContext(AuthContext);

    const isAdmin = AuthenticationService.hasRole(AuthenticationService.ROLES.ADMIN);
    const isModerator = AuthenticationService.hasRole(AuthenticationService.ROLES.MODERATOR);


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
            {isAdmin && <p>ADMIN</p>}
            {isModerator && <p>MODERATOR</p>}
            <h2>{welcomeMessage}</h2>
        </div>
    )
}

export default Home;