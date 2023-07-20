import axios from "../axiosConfig/axiosConfig"

const SIGNUP_URL = "http://localhost:8080/users/signup";

const SignUpService = async (user) => {
    try {
        return await axios.post(SIGNUP_URL,
            JSON.stringify({user}),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        );
    } catch (error) {
        console.log("Register failed", error);
        throw error;
    }
};

export default SignUpService;