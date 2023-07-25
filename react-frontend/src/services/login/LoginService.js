import axios from "../axiosConfig/axiosConfig";

const LOGIN_URL = "http://localhost:8080/api/auth/signin"


const LoginService = async (username, password) => {
    try {
        return await axios.post(LOGIN_URL,
            JSON.stringify({username, password}),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.log("Login failed", error);
        throw error;
    }
};

export default LoginService;