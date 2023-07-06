import axios from "../axiosConfig/axiosConfig";

const LOGIN_URL = "/users/login"


const LoginService = async (username, password) => {
    try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({username, password}));
        return response.data;
    } catch (error) {
        console.log("Login failed", error);
        throw error;
    }
};

export default LoginService;