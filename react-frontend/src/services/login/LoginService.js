import axios from "../axiosConfig/axiosConfig";

const LOGIN_URL = "http://localhost:8080/users/login"


const LoginService = async (username, password) => {
    try {
        return await axios.post(LOGIN_URL,
            JSON.stringify({username, password}),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        );
    } catch (error) {
        console.log("Login failed", error);
        throw error;
    }
};

export default LoginService;