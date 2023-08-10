import React, {useState, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import isEmail from "validator/es/lib/isEmail";
import CheckButton from "react-validation/build/button";
import {Link} from "react-router-dom";
import {FaCheck, FaEye} from "react-icons/fa";
import AuthService from "../services/auth.service";
import {PasswordStrengthIndicator} from "../utils/password-strength.util";
import styles from "../css/signup-signin.module.css";
import {withRouter} from "../common/with-router";
import InfoButton from "../utils/info-button.util";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const PASSWORD_REGEX = /^(.){5,30}$/;

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
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
    const [validUsername, setValidUsername] = useState(false);

    const [checkBtn, setCheckBtn] = useState(null);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(isEmail(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === confirmPassword && PASSWORD_REGEX.test(password));
    }, [password, confirmPassword]);


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        form.validateAll();

        if (checkBtn.context._errors.length === 0 && !!validUsername && validEmail && validPassword && validMatch) {
            AuthService.register(username, email, password, confirmPassword)
                .then((response) => {
                    setMessage(response.data.message);
                    setSuccess(true);
                    setLoading(true);
                }, (error) => {
                    const responseMessage = error.response.data ||
                        (error.response.data && error.response && error.response.data.message)
                        || error.message
                        || error.toString();
                    console.log(error.response.data);
                    setMessage(responseMessage);
                    setSuccess(false);
                    setLoading(false);
                });
        } else {
            let err = "";
            if(username.length > 0 && !validUsername){
                err = "Invalid username!\n";
            }
            if(email.length > 0 && !validEmail){
                err += "Invalid email address!\n";
            }
            if(password.length > 0 && !validPassword){
                err += "Invalid password!\n";
            }
            if(password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword){
                err += "Passwords do not match!";
            }


            setMessage(err);
            setSuccess(false);
            setLoading(false);
        }
    };

    return (
        <>
            {success ? (
                <section className={styles.container}>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
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
                        {/* Username */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                Username:
                                {validUsername ? <FaCheck className={styles.validIcon}/> : null}
                            </label>
                            <Input
                                type="text"
                                id="username"
                                autoComplete="off"
                                className={`${styles.input} ${focusedField === "username" ? styles.focused : ""}`}
                                onChange={onChangeUsername}
                                value={username}
                                validations={[required]}
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => handleFocus("username")}
                                onBlur={handleBlur}
                            />

                        <InfoButton text=" Username must be:
                                        between 4 to 24 characters,
                                        begin with a letter,
                                        consist of letters, numbers, underscores, or hyphens."/>
                        </div>
                        {/* Email */}
                        <label htmlFor="username" className={styles.label}>
                            Email address:
                            {validEmail ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <div className={styles.inputGroup}>
                            <Input
                                type="email"
                                id="email"
                                autoComplete="off"
                                className={`${styles.input} ${focusedField === "emial" ? styles.focused : ""}`}
                                onChange={onChangeEmail}
                                value={email}
                                validations={[required]}
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="mailnote"
                                onFocus={() => handleFocus("email")}
                                onBlur={handleBlur}
                            />
                            <InfoButton text="Must be a valid email address."/>

                        </div>
                        {/* Password */}
                        <label htmlFor="email" className={styles.label}>
                            Password:
                            {validPassword ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <div className={styles.inputGroup}>
                            <Input
                                type={hidePassword ? "password" : "text"}
                                id="password"
                                className={`${styles.input} ${focusedField === "password" ? styles.focused : ""}`}
                                onChange={onChangePassword}
                                value={password}
                                validations={[required]}
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => handleFocus("password")}
                                onBlur={handleBlur}
                            />
                            <PasswordStrengthIndicator password={password}/>
                            <InfoButton text="Password must be between 5 to 30 characters.
                                    Include uppercase and lowercase letters, numbers, and special characters
                                    to create a strong password."/>
                        </div>

                        {/* Confirm Password */}
                        <label htmlFor="confirmPassword" className={styles.label}>
                            Confirm Password:
                            {validMatch ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <div className={styles.inputGroup}>
                            <Input
                                type={hidePassword ? "password" : "text"}
                                name="confirmPassword"
                                className={`${styles.input} ${focusedField === "confirmPassword" ? styles.focused : ""}`}
                                onChange={onChangeConfirmPassword}
                                value={confirmPassword}
                                validations={[required]}
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => handleFocus("confirmPassword")}
                                onBlur={handleBlur}
                            />
                            <InfoButton text="Must match the first password input field."/>
                        </div>

                        <a
                            href="#"
                            className={hidePassword ? styles.toggleBtn : styles.active}
                            onClick={() => {
                                setHidePassword(!hidePassword);
                            }}
                        >
                            <FaEye style={{color: !hidePassword ? "#FF0054" : "#c3c3c3"}}/>
                            {hidePassword ? "Show" : "Hide"} password
                        </a>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.button}>
                                {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                                <span>Register</span>
                            </button>
                        </div>
                        <CheckButton ref={setCheckBtn}></CheckButton>
                    </Form>
                    <p>
                        Already registered?
                        <br/>
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
