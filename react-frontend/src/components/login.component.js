import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {withRouter} from "../common/with-router";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import {FaEye} from "react-icons/fa";
import styles from "../css/signup-signIn.module.css";


const required = (value) => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">
            This field is required!
        </div>);
    }
};


const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);

    const isFormValid = !!username && !!password;
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            AuthService.login(username, password)
                .then(() => {
                    props.router.navigate("/home");
                    window.location.reload();
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                });
        } else {
            setLoading(false);
        }
    };

    return (<section className={styles.container}>
        <h1 className={styles.heading}>Sign In</h1>

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
                    className={styles.input}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password:
                </label>
                <Input
                    type={hidePassword ? "password" : "text"}
                    name="password"
                    onChange={onChangePassword}
                    value={password}
                    validations={[required]}
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
                    {hidePassword ? "Show" : "Hide"} password
                </a>
            </div>

            {message && (<div className={styles.errorMessage}>
                <div className={styles.alert}>
                    <span>{message}</span>
                </div>
            </div>)}

            <div className={styles.buttonGroup}>
                <button
                    className={`${styles.button} ${loading || !isFormValid ? styles.buttonDisabled : ''}`}
                    disabled={loading || !isFormValid}>
                    {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                    <span>Login</span>
                </button>
            </div>

            <CheckButton ref={setCheckBtn}></CheckButton>
        </Form>

        <p className={styles.paragraph}>
            Need an Account?
            <br/>
            <span className={styles.line}>
      <Link to="/signup">Sign Up</Link>
    </span>
        </p>
    </section>);
}

export default withRouter(Login);