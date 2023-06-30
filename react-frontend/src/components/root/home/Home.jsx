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
            <h1>Welcome to the Home Page</h1>
            <p>content content content content</p>
            <p>{welcomeMessage}</p>
        </div>
    );
}

export default Home;