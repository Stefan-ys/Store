import React, {useRef, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import LoginService from "../../../../services/login/LoginService";
import {FaEye} from "react-icons/fa";
import styles from "../../../../css/SignUpSignIn.module.css"

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
        <>
            {success ? (
                <section  className={styles.container}>
                    <h1 className={styles.heading}>You are logged in!</h1>
                    <br/>
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section  className={styles.container}>
                    <p
                        ref={errRef}
                        className={setError ? styles.error : styles.offscreen}
                        aria-live="assertive"
                    >
                        {error}
                    </p>
                    <h1 className={styles.heading}>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className={styles.label}>
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            className={styles.input}
                        />

                        <label htmlFor="password" className={styles.label}>
                            Password:
                        </label>
                        <input
                            type={hidePassword ? "password" : "text"}
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className={styles.input}
                        />
                        <a
                            href="#"
                            className={hidePassword ? styles.toggleBtn : styles.active}
                            onClick={() => {
                                setHidePassword(!hidePassword);
                            }}
                        >
                            <FaEye style={{color: !hidePassword ? "#FF0054" : "#c3c3c3"}}/>
                            {hidePassword ? "show" : "hide"} password
                        </a>
                        <button className={styles.button}>Sign In</button>
                    </form>
                    <p className={styles.paragraph}>
                        Need an Account?
                        <br/>
                        <span className={styles.line}>
          <Link to="/signup">Sign Up</Link>
        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default Login;