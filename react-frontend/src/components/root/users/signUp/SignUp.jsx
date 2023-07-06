import React, {useState, useRef, useEffect} from "react";
import {FaCheck, FaTimes, FaInfoCircle, FaEye, FaMinus} from "react-icons/fa";
import SignUpService from "../../../../services/signup/SignUpService";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,20}$/;
const EMAIL_REGEX = /^.+@.+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(.){5,30}$/;

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emilFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [activeColor, setActiveColor] = useState("lightgray");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);


    const handlePasswordStrength = (password) => {
        const strengthChecks = {
            length: 0,
            hasUpperCase: false,
            hasLowerCase: false,
            hasDigit: false,
            hasSpecialChar: false,
        };

        strengthChecks.length = password.length >= 8;
        strengthChecks.hasUpperCase = /[A_Z]+/.test(password);
        strengthChecks.hasLowerCase = /[a-z]+/.test(password);
        strengthChecks.hasDigit = /[0-9]+/.test(password);
        strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(password);

        let verifiedList = Object.values(strengthChecks).filter((value) => value);

        let strength =
            verifiedList.length >= 4 ? "Strong"
                : verifiedList.length >= 2 ? "Medium"
                : "Weak";
        setPasswordStrength(strength);
        setActiveColor(getActiveColor(strength))
    };

    const getActiveColor = (type) => {
        return type === "Strong" ? "#8BC926"
            : type === "Medium" ? "#FEBD01" : "#FF0054";
    }


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword && PASSWORD_REGEX.test(password));
    }, [password, matchPassword]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        if (!validName || !validPassword) {
            setErrMsg("Invalid Entry");
            return;
        }

        SignUpService()
            .then((response) => {
                console.log(response?.data);
                console.log(response?.accessToken);
                console.log(JSON.stringify(response))
                setSuccess(true);

                setUser("");
                setPassword("");
                setMatchPassword("");
            })
            .catch((error) => {
                if (!error?.response) {
                    setErrMsg("No Server Response");
                } else if (error.response?.status === 409) {
                    setErrMsg("Username Taken");
                } else {
                    setErrMsg("Registration Failed")
                }
                errRef.current.focus();
            })
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FaCheck className={validName ? "valid" : "hide"}/>
                            <FaTimes className={validName || !user ? "hide" : "invalid"}/>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FaInfoCircle/>
                            Username must be:<br/>
                            between 4 to 24 characters,<br/>
                            begin with a letter,<br/>
                            consist of letters, numbers, underscores or hyphens.
                        </p>

                        <label htmlFor="email">
                            Email address:
                            <FaCheck className={validEmail ? "valid" : "hide"}/>
                            <FaTimes className={validEmail || !email ? "hide" : "invalid"}/>
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="maiinote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="mailnote" className={emilFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FaInfoCircle/>
                            Must be valid email address.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FaCheck className={validPassword ? "valid" : "hide"}/>
                            <FaTimes className={validPassword || !password ? "hide" : "invalid"}/>
                        </label>
                        <input
                            type={hidePassword ? "password" : "text"}
                            id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handlePasswordStrength(e.target.value);

                            }}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        {password && (
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
                                <hr style={{
                                    flex: 1,
                                    border: "none",
                                    borderTop: "8px solid",
                                    borderRadius: "2px",
                                    margin: "0 5px",
                                    marginTop: "8px",
                                    color: activeColor
                                }}/>
                                <hr style={{
                                    flex: 1,
                                    border: "none",
                                    borderTop: "8px solid",
                                    borderRadius: "2px",
                                    margin: "0 5px",
                                    marginTop: "8px",
                                    color: passwordStrength === "Medium" || passwordStrength === "Strong" ? activeColor : "lightgray"
                                }}/>
                                <hr style={{
                                    flex: 1,
                                    border: "none",
                                    borderTop: "8px solid",
                                    borderRadius: "2px",
                                    margin: "0 5px",
                                    marginTop: "8px",
                                    color: passwordStrength === "Strong" ? activeColor : "lightgrey"
                                }}/>
                            </div>)}
                        {password && (
                            <p style={{color: activeColor, fontSize: "smaller",}}>Your password
                                is {passwordStrength.toLowerCase()}</p>
                        )}

                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FaInfoCircle/>
                            Password must between 5 to 30 characters.<br/>
                            Include uppercase and lowercase letters, numbers and special characters<br/>
                            to make a strong password.
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FaCheck className={validMatch && matchPassword ? "valid" : "hide"}/>
                            <FaTimes className={validMatch || !matchPassword ? "hide" : "invalid"}/>
                        </label>
                        <input
                            type={hidePassword ? "password" : "text"}
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <a href="#" className="toggle-btn" onClick={() => {
                            setHidePassword(!hidePassword);
                        }}>
                            <FaEye style={{color: !hidePassword ? "#FF0054" : "#c3c3c3"}}/>{hidePassword ? "show" : "hide" } password
                        </a>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FaInfoCircle/>
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPassword || !validMatch}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br/>
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                                </span>
                    </p>
                </section>
            )}
        </>
    )
}
export default SignUp;