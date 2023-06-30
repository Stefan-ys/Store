import React, {useRef, useState, useEffect} from "react";

const LoginForm = () => {
    const userRef = useRef();
    const errRef = useRef();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setError("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true);
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
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input
                        id="username"
                        type="text"
                        ref={userRef}
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </section>
        )}</>
    );
}

export default LoginForm;