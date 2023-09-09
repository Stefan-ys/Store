import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";


const login = (username, password) => {
    return axios
        .post(API_URL + "/login", { username, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "/logout", { credentials: "include" });

};

const register = (username, email, password, confirmPassword) => {
    return axios.post(API_URL + "/register", {
        username,
        email,
        password,
        confirmPassword
    }, {
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => { return response; })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = { login, register, logout, getCurrentUser };
export default AuthService;