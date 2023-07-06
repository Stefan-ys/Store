import React, {useRef, useState, useEffect} from "react";
import LoginService from "../../../../services/login/LoginService";
import {FaEye} from "react-icons/fa";

const Login = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [hidePassword, setHidePassword] = useState(true);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setError("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await LoginService(username, password);
            console.log("User data: ", userData);
        } catch (error) {
            if (!error?.response) {
                setError("No Server Response");
            } else if (error.response?.status === 400) {
                setError("Missing Username or Password");
            } else if (error.response?.status === 401) {
                setError("Unauthorized");
            } else {
                setError("Login Failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <>{success ? (
            <section>
                <h1>You are logged in!</h1>
                <br/>
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={setError ? "error" : "offscreen"} aria-live="assertive">{error}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type= {hidePassword ? "password" : "text"}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <a href="#" className="toggle-btn" onClick={() => {
                        setHidePassword(!hidePassword);
                    }}>
                        <FaEye style={{color: !hidePassword ? "#FF0054" : "#c3c3c3"}}/>{hidePassword ? "show" : "hide" } password
                    </a>
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                            {/*put router link here*/}
                        <a href="#">Sign Up</a>
                        </span>
                </p>
            </section>
        )}</>
    );
}

export default Login;