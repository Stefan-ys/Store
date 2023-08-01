import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {FaCheck, FaTimes, FaInfoCircle, FaEye} from "react-icons/fa";
import AuthService from "../../../services/AuthService";
import {PasswordStrengthIndicator} from "../../../utils/PasswordStrenght";
import styles from "../../../css/SignUpSignIn.module.css"


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const EMAIL_REGEX = /^.+@.+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(.){5,30}$/;

const SignUp = () => {
        const userRef = useRef();
        const errRef = useRef();

        const [user, setUser] = useState({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        const [validName, setValidName] = useState(false);
        const [userFocus, setUserFocus] = useState(false);

        const [validEmail, setValidEmail] = useState(false);
        const [emilFocus, setEmailFocus] = useState(false);

        const [validPassword, setValidPassword] = useState(false);
        const [passwordFocus, setPasswordFocus] = useState(false);

        const [validMatch, setValidMatch] = useState(false);
        const [matchFocus, setMatchFocus] = useState(false);

        const [hidePassword, setHidePassword] = useState(true);


        const [errMsg, setErrMsg] = useState("");
        const [success, setSuccess] = useState(false);

        const resetUser = () => {
            Object.keys(user).forEach((key) => {
                setUser(prevState => ({
                    ...prevState, [key]: ""
                }));
            });
        };


        useEffect(() => {
            userRef.current.focus();
        }, []);

        useEffect(() => {
            setValidName(USER_REGEX.test(user.username));
        }, [user.username]);

        useEffect(() => {
            setValidEmail(EMAIL_REGEX.test(user.email));
        }, [user.email]);

        useEffect(() => {
            setValidPassword(PASSWORD_REGEX.test(user.password));
            setValidMatch(user.password === user.confirmPassword && PASSWORD_REGEX.test(user.password));
        }, [user.password, user.confirmPassword]);


        const handleSubmit = async (e) => {
            e.preventDefault();
            // if button enabled with JS hack
            if (!validName || !validPassword) {
                setErrMsg("Invalid Entry");
                return;
            }
            try {
                const response = AuthService.register(user.username, user.email, user.password, user.confirmPassword);
                console.log(JSON.stringify((await response)?.data));
                setSuccess(true);
                resetUser();
            } catch (error) {
                if (!error?.response) {
                    setErrMsg("No Server Response");
                } else if (error.response?.status === 409) {
                    setErrMsg("Username Taken");
                } else {
                    setErrMsg("Registration Failed")
                }
                errRef.current.focus();
            }
        }

        return (
            <>
                {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/login">Sign In</Link>
                        </p>
                    </section>
                ) : (
                    <section className={styles.container}>
                        <p
                            ref={errRef}
                            className={errMsg ? styles.errmsg : styles.offscreen}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <label htmlFor="username" className={styles.label}>
                                Username:
                                <FaCheck
                                    className={validName ? styles.valid : styles.hide}
                                />
                                <FaTimes
                                    className={validName || !user.username ? styles.hide : styles.invalid}
                                />
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                className={styles.input}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                value={user.username}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={
                                    userFocus && user.username && !validName
                                        ? styles.instructions
                                        : styles.offscreen
                                }
                            >
                                <FaInfoCircle/>
                                Username must be:<br/>
                                between 4 to 24 characters,<br/>
                                begin with a letter,<br/>
                                consist of letters, numbers, underscores, or hyphens.
                            </p>

                            {/* Email */}
                            <label htmlFor="email" className={styles.label}>
                                Email address:
                                <FaCheck
                                    className={validEmail ? styles.valid : styles.hide}
                                />
                                <FaTimes
                                    className={validEmail || !user.email ? styles.hide : styles.invalid}
                                />
                            </label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                className={styles.input}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                value={user.email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="mailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p
                                id="mailnote"
                                className={
                                    emilFocus && user.email && !validEmail
                                        ? styles.instructions
                                        : styles.offscreen
                                }
                            >
                                <FaInfoCircle/>
                                Must be a valid email address.
                            </p>

                            {/* Password */}
                            <label htmlFor="password" className={styles.label}>
                                Password:
                                <FaCheck
                                    className={validPassword ? styles.valid : styles.hide}
                                />
                                <FaTimes
                                    className={
                                        validPassword || !user.password
                                            ? styles.hide
                                            : styles.invalid
                                    }
                                />
                            </label>
                            <input
                                type={hidePassword ? "password" : "text"}
                                id="password"
                                className={styles.input}
                                onChange={(e) => {
                                    setUser({...user, password: e.target.value});
                                }}
                                value={user.password}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />

                            <PasswordStrengthIndicator password={user.password}/>

                            <p
                                id="pwdnote"
                                className={
                                    passwordFocus && user.password && !validPassword
                                        ? styles.instructions
                                        : styles.offscreen
                                }
                            >
                                <FaInfoCircle/>
                                Password must be between 5 to 30 characters.<br/>
                                Include uppercase and lowercase letters, numbers, and special characters<br/>
                                to create a strong password.
                            </p>

                            {/* Confirm Password */}
                            <label htmlFor="confirm_pwd" className={styles.label}>
                                Confirm Password:
                                <FaCheck
                                    className={
                                        validMatch && user.confirmPassword
                                            ? styles.valid
                                            : styles.hide
                                    }
                                />
                                <FaTimes
                                    className={
                                        validMatch || !user.confirmPassword
                                            ? styles.hide
                                            : styles.invalid
                                    }
                                />
                            </label>
                            <input
                                type={hidePassword ? "password" : "text"}
                                id="confirm_pwd"
                                className={styles.input}
                                onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                                value={user.confirmPassword}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <a
                                href="#"
                                className={styles.toggleBtn}
                                onClick={() => {
                                    setHidePassword(!hidePassword);
                                }}
                            >
                                <FaEye
                                    style={{
                                        color: !hidePassword ? "#FF0054" : "#c3c3c3",
                                    }}
                                />
                                {hidePassword ? "show" : "hide"} password
                            </a>
                            <p
                                id="confirmnote"
                                className={
                                    matchFocus && user.confirmPassword && !validMatch
                                        ? styles.instructions
                                        : styles.offscreen
                                }
                            >
                                <FaInfoCircle/>
                                Must match the first password input field.
                            </p>

                            <button
                                disabled={!validName || !validPassword || !validMatch}
                                className={styles.button}
                            >
                                Sign Up
                            </button>
                        </form>
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
    }
;

export default SignUp;