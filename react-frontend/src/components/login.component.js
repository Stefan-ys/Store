import React, { useEffect, useRef, useState } from "react";
import styles from "../css/signup-signin.module.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { withRouter } from "../common/with-router";
import { FaEye } from "react-icons/fa";

const required = (value) => {
    if (!value) {
        return <div className={styles.danger}>This field is required!</div>;
    }
};

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [focusedField, setFocusedField] = useState(null);
    const checkButton = useRef();

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setLoading(true);
        form.validateAll();
        if (username.length === 0 || password.length === 0) {
            setLoading(false);
            return;
        }

        try {
            const data = await AuthService.login(username, password);
            setMessage("Welcome " + data.username + "!");
            props.router.navigate("/home");
            window.location.reload();
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            <h1 className={styles.heading}>Login</h1>

            {message && (
                <div className={styles.errorMessage}>
                    <div className={styles.alert}>
                        <span>{message}</span>
                    </div>
                </div>
            )}

            <Form onSubmit={handleSubmit} ref={setForm}>
                {/* USERNAME INPUT */}
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>
                        Username:
                    </label>
                    <Input
                        type="text"
                        name="username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        validations={[required]}
                        onFocus={() => handleFocus("username")}
                        onBlur={handleBlur}
                        className={`${styles.input} ${focusedField === "username" ? styles.focused : ""
                            }`}
                    />
                </div>
                {/* PASSWORD INPUT */}
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password:
                    </label>
                    <Input
                        type={hidePassword ? "password" : "text"}
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validations={[required]}
                        onFocus={() => handleFocus("password")}
                        onBlur={handleBlur}
                        className={`${styles.input} ${focusedField === "password" ? styles.focused : ""
                            }`}
                    />
                    <a
                        href="#"
                        className={hidePassword ? styles.toggleBtn : styles.active}
                        onClick={() => { togglePasswordVisibility() }}
                    >
                        <FaEye style={{ color: hidePassword ? "#c3c3c3" : "#FF0054" }} />
                        {hidePassword ? "Show" : "Hide"} password
                    </a>
                </div>

                {/* SUBMIT BUTTON */}
                <div className={styles.buttonGroup}>
                    <button
                        ref={checkButton}
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? (<span className={styles.spinner}></span>) : <span>Login</span>}
                    </button>
                </div>
            </Form>

            {/* SIGN UP LINK */}
            <p className={styles.paragraph}>
                Need an Account?
                <br />
                <span className={styles.line}>
                    <Link to="/signup">Sign Up</Link>
                </span>
            </p>
        </section>
    );
};

export default withRouter(Login);
