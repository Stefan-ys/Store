import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"


const login = (username, password) => {
    return axios
        .post(API_URL + "/login", {username, password})
        .then((response) => {
            if (response.data.accessToken) {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((error) => {
            throw new Error(error.response.data);
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "/logout", {credentials: "include"});

}

const register = (username, email, password, confirmPassword) => {
    return axios.post(API_URL + "/register", {
            username,
            email,
            password,
            confirmPassword
        }, {
            headers: {"Content-Type": "application/json"}
        }
    );
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {login, register, logout, getCurrentUser};
export default AuthService;