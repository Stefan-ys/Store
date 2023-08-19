import React, { useState, useEffect, useRef } from "react";
import styles from "../css/signup-signin.module.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import { withRouter } from "../common/with-router";
import { FaCheck, FaEye } from "react-icons/fa";
import { PasswordStrengthIndicator } from "../utils/password-strength.util";
import InfoButton from "../utils/info-button.util";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const PASSWORD_REGEX = /^(.){5,30}$/;

const required = (value) => {
    if (!value) {
        return <div className={styles.danger}>This field is required!</div>;
    }
};
const RegisterComponent = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(null);
    const [success, setSuccess] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [focusedField, setFocusedField] = useState(null);
    


    const validation = {
        validUsername: USER_REGEX.test(username),
        validEmail: isEmail(email),
        validPassword: PASSWORD_REGEX.test(password),
        validMatch: password === confirmPassword && password.length > 0,
    };


    const handleFieldChange = (valueSetter) => (e) => {
        valueSetter(e.target.value);
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };



    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        const errorMessage = [];

        if (!validation.validUsername && username.length > 0) {
            errorMessage.push("Invalid username!");
        }
        if (!validation.validEmail && email.length > 0) {
            errorMessage.push("Invalid email address!");
        }
        if (!validation.validPassword && password.length > 0) {
            errorMessage.push("Invalid password!");
        }
        if (!validation.validMatch && password.length > 0) {
            errorMessage.push("Passwords do not march!");
        }
        form.validateAll();
        const emptyFields = (username.length === 0 || email.length === 0 || password === 0 || confirmPassword === 0);
        if (errorMessage.length > 0 || emptyFields) {
            setMessage(errorMessage.join("\n"));
            setSuccess(false);
            setLoading(false);
            return;
        }

        try {
            await AuthService.register(username, email, password, confirmPassword);
            setMessage("Registration is successful!")
            setSuccess(true);
        } catch (error) {
            const responseMessage = error.response.data.errors.join("\n") || error.response?.data?.message || error.message || error.toString();
            setMessage(responseMessage);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {success ? (
                <section className={styles.container}>
                    <h1 className={styles.heading}>Success!</h1>
                    <p>
                        <Link to="/login">Login</Link>
                    </p>
                </section>
            ) : (
                <section className={styles.container}>
                    <h1 className={styles.heading}>Register</h1>
                    {message && (
                        <div className={styles.errorMessage}>
                            <div className={styles.alert}>
                                <span>{message}</span>
                            </div>
                        </div>
                    )}


                    <Form onSubmit={handleSubmit} ref={setForm}>
                        {/* USERNAME */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                Username:
                                {validation.validUsername ? <FaCheck className={styles.validIcon} /> : null}
                            </label>
                            <Input
                                type="text"
                                id="username"
                                autoComplete="off"
                                className={`${styles.input} ${focusedField === "username" ? styles.focused : ""}`}
                                onChange={handleFieldChange(setUsername)}
                                value={username}
                                validations={[required]}
                                aria-invalid={!validation.validUsername}
                                aria-describedby="uidnote"
                                onFocus={() => handleFocus("username")}
                                onBlur={handleBlur}
                            />

                            <InfoButton text=" Username must be:
                                        between 4 to 24 characters,
                                        begin with a letter,
                                        consist of letters, numbers, underscores, or hyphens."/>
                        </div>
                        {/* EMAIL */}
                        <label htmlFor="email" className={styles.label}>
                            Email address:
                            {validation.validEmail  === true ? <FaCheck className={styles.validIcon} /> : null}
                        </label>
                        <div className={styles.inputGroup}>
                            <Input
                                type="email"
                                id="email"
                                autoComplete="off"
                                className={`${styles.input} ${focusedField === "email" ? styles.focused : ""}`}
                                onChange={handleFieldChange(setEmail)}
                                value={email}
                                validations={[required]}
                                aria-invalid={!validation.validEmail}
                                aria-describedby="mailnote"
                                onFocus={() => handleFocus("email")}
                                onBlur={handleBlur}
                            />
                            <InfoButton text="Must be a valid email address." />

                        </div>
                        {/* PASSWORD */}
                        <label htmlFor="password" className={styles.label}>
                            Password:
                            {validation.validPassword === true ? <FaCheck className={styles.validIcon} /> : null}
                        </label>
                        <div className={styles.inputGroup}>
                            <Input
                                type={hidePassword ? "password" : "text"}
                                id="password"
                                className={`${styles.input} ${focusedField === "password" ? styles.focused : ""}`}
                                onChange={handleFieldChange(setPassword)}
                                value={password}
                                validations={[required]}
                                aria-invalid={!validation.validPassword}
                                aria-describedby="pwdnote"
                                onFocus={() => handleFocus("password")}
                                onBlur={handleBlur}
                            />
                            <PasswordStrengthIndicator password={password} />
                            <InfoButton text="Password must be between 5 to 30 characters.
                                    Include uppercase and lowercase letters, numbers, and special characters
                                    to create a strong password."/>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <label htmlFor="confirmPassword" className={styles.label}>
                            Confirm Password:
                            {validation.validMatch === true ? <FaCheck className={styles.validIcon} /> : null}
                        </label>
                        <div className={styles.inputGroup}>
                            <Input
                                type={hidePassword ? "password" : "text"}
                                name="confirmPassword"
                                className={`${styles.input} ${focusedField === "confirmPassword" ? styles.focused : ""}`}
                                onChange={handleFieldChange(setConfirmPassword)}
                                value={confirmPassword}
                                validations={[required]}
                                aria-invalid={!validation.validMatch}
                                aria-describedby="confirmnote"
                                onFocus={() => handleFocus("confirmPassword")}
                                onBlur={handleBlur}
                            />
                            <InfoButton text="Must match the first password input field." />
                        </div>

                        <a href="#" className={hidePassword ? styles.toggleBtn : styles.active}
                            onClick={() => { togglePasswordVisibility() }}
                        >
                            <FaEye style={{ color: !hidePassword ? "#FF0054" : "#c3c3c3" }} />
                            {hidePassword ? "Show" : "Hide"} password
                        </a>

                        <div className={styles.buttonGroup}>
                            <button className={styles.button}>
                                <span>Register</span>
                                {loading && (<span className={styles.spinner}></span>)}
                            </button>
                        </div>
                    </Form>
                    <p>
                        Already registered?
                        <br />
                        <span className={styles.line}>
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default withRouter(RegisterComponent);
