import React, {useRef, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { withRouter } from "../common/with-router";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { FaEye } from "react-icons/fa";
import styles from "../css/signup-signin.module.css";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [focusedField, setFocusedField] = useState(null);

    const isFormValid = !!username && !!password;


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            AuthService.login(username, password)
                .then(() => {
                    window.open("/my-profile");
                    window.location.reload();
                }, (error) => {
                    const responseMessage = (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(responseMessage);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            <h1 className={styles.heading}>Sign In</h1>

            {message && (
                <div className={styles.errorMessage}>
                    <div className={styles.alert}>
                        <span>{message}</span>
                    </div>
                </div>
            )}

            <Form onSubmit={handleSubmit} ref={setForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>
                        Username:
                    </label>
                    <Input
                        type="text"
                        name="username"
                        autoComplete="off"
                        onChange={onChangeUsername}
                        value={username}
                        validations={[required]}
                        onFocus={() => handleFocus("username")}
                        onBlur={handleBlur}
                        className={`${styles.input} ${
                            focusedField === "username" ? styles.focused : ""
                        }`}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password:
                    </label>
                    <Input
                        type={hidePassword ? "password" : "text"}
                        name="password"
                        autoComplete="off"
                        onChange={onChangePassword}
                        value={password}
                        validations={[required]}
                        onFocus={() => handleFocus("password")}
                        onBlur={handleBlur}
                        className={`${styles.input} ${
                            focusedField === "password" ? styles.focused : ""
                        }`}
                    />
                    <a
                        href="#"
                        className={hidePassword ? styles.toggleBtn : styles.active}
                        onClick={() => {
                            setHidePassword(!hidePassword);
                        }}
                    >
                        <FaEye style={{ color: !hidePassword ? "#FF0054" : "#c3c3c3" }} />
                        {hidePassword ? "Show" : "Hide"} password
                    </a>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={`${styles.button} ${loading || !isFormValid ? styles.buttonDisabled : ""}`}
                        disabled={loading || !isFormValid}
                    >
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        <span>Login</span>
                    </button>
                </div>

                <CheckButton ref={setCheckBtn}></CheckButton>
            </Form>

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
