import axios from "../axiosConfig/axiosConfig"

const SIGNUP_URL = "/users/signup";

const SignUpService = async (user) => {
    try {
        const response = await axios.post(SIGNUP_URL, user);
        return response.data;
    } catch (error) {
        console.log("Sign up failed: ", error);
        throw error;
    }
};

export default SignUpService;