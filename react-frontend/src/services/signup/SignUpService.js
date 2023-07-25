import axios from "../axiosConfig/axiosConfig"

const SIGNUP_URL = "http://localhost:8080/api/auth/signup";

const SignUpService = async (username, email, password, confirmPassword) => {
    try {
        return await axios.post(SIGNUP_URL,
            JSON.stringify({username, email, password, confirmPassword}),
            {
                headers: {"Content-Type": "application/json"},
            }
        );
    } catch (error) {
        console.log("Register failed", error);
        throw error;
    }
};

export default SignUpService;