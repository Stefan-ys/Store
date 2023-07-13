import axios from "../axiosConfig/axiosConfig"

const SIGNUP_URL = "http://localhost:8080/users/signup";

const SignUpService = (user) => {
    return axios.post(SIGNUP_URL, user)
        .then(response => response.data)
        .catch(error => {
            console.log("Sign up failed:", error);
            throw error;
        });
};

export default SignUpService;