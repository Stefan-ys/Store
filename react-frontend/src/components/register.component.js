import React, {useState, useRef, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import isEmail from "validator/es/lib/isEmail";
import CheckButton from "react-validation/build/button";
import {Link} from "react-router-dom";
import {FaCheck, FaTimes, FaInfoCircle, FaEye} from "react-icons/fa";
import AuthService from "../services/auth.service";
import {PasswordStrengthIndicator} from "../utils/PasswordStrenght";
import styles from "../css/signup-signin.module.css";
import {withRouter} from "../common/with-router";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const PASSWORD_REGEX = /^(.){5,30}$/;

const required = (value) => {
    if (!value) {
        return (
            <div className={styles.alert} role="alert">
                This field is required!
            </div>
        );
    }
};


const invalidFormat = (message) => {
    return <div className={styles.alert}>{message}</div>;
};

const RegisterComponent = (props) => {
    const userRef = useRef();

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

    const isFormValid = validUsername && validEmail && validPassword && validMatch && !!username && !!email && !!password && !!confirmPassword;


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

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            AuthService.register(username, email, password, confirmPassword)
                .then((response) => {
                        setMessage(response.data.message);
                        setSuccess(true);
                        setLoading(true);
                    }, (error) => {
                        const responseMessage =  error.response.data ||
                             (error.response.data && error.response && error.response.data.message)
                             || error.message
                             || error.toString();
                       console.log(error.response.data);
                        setMessage(responseMessage);
                        setSuccess(false);
                        setLoading(false);
                    });
        } else {
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
                        <label htmlFor="username"
                               className={`${styles.label} ${validUsername ? styles.validLabel : ""}`}>
                            Username:
                            {validUsername ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <Input
                            type="text"
                            id="username"
                            autoComplete="off"
                            className={`${styles.input} ${validUsername ? styles.validInput : styles.invalidInput}`}
                            onChange={onChangeUsername}
                            value={username}
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                        />
                        <div className={`${styles.alert} ${validUsername ? styles.validAlert : styles.invalidAlert}`}>
                            <FaInfoCircle className={styles.infoCircle}/>
                            Username must be:<br/>
                            between 4 to 24 characters,<br/>
                            begin with a letter,<br/>
                            consist of letters, numbers, underscores, or hyphens.
                        </div>

                        {/* Email */}
                        <label htmlFor="email" className={`${styles.label} ${validEmail ? styles.validLabel : ""}`}>
                            Email address:
                            {validEmail ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <Input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            className={`${styles.input} ${validEmail ? styles.validInput : styles.invalidInput}`}
                            onChange={onChangeEmail}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="mailnote"
                        />

                        <div className={`${styles.alert} ${validEmail ? styles.validAlert : styles.invalidAlert}`}>
                            <FaInfoCircle className={styles.infoCircle}/>
                            Must be a valid email address.
                        </div>

                        {/* Password */}
                        <label htmlFor="password"
                               className={`${styles.label} ${validPassword ? styles.validLabel : ""}`}>
                            Password:
                            {validPassword ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <Input
                            type={hidePassword ? "password" : "text"}
                            id="password"
                            className={`${styles.input} ${validPassword ? styles.validInput : styles.invalidInput}`}
                            onChange={onChangePassword}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                        />
                        <PasswordStrengthIndicator password={password}/>

                        <div className={`${styles.alert} ${validPassword ? styles.validAlert : styles.invalidAlert}`}>
                            <FaInfoCircle className={styles.infoCircle}/>
                            Password must be between 5 to 30 characters.<br/>
                            Include uppercase and lowercase letters, numbers, and special characters<br/>
                            to create a strong password.
                        </div>

                        {/* Confirm Password */}
                        <label htmlFor="confirm_pwd"
                               className={`${styles.label} ${validMatch ? styles.validLabel : ""}`}>
                            Confirm Password:
                            {validMatch ? <FaCheck className={styles.validIcon}/> : null}
                        </label>
                        <Input
                            type={hidePassword ? "password" : "text"}
                            id="confirm_pwd"
                            className={`${styles.input} ${validMatch ? styles.validInput : styles.invalidInput}`}
                            onChange={onChangeConfirmPassword}
                            value={confirmPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                        />

                        <div className={`${styles.alert} ${validMatch ? styles.validAlert : styles.invalidAlert}`}>
                            <FaInfoCircle className={styles.infoCircle}/>
                            Must match the first password input field.
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
                                className={`${styles.button} ${loading || !isFormValid ? styles.buttonDisabled : ''}`}
                                disabled={loading || !isFormValid}>
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
