import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/signin", {username, password})
            .then((response) => {

                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch((error) => {
                throw new Error(error.response.data);
            });
    }

    logout() {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        return axios.post(API_URL + "/signout", {credentials: "include"});

    }

    register(username, email, password, confirmPassword) {
        return axios.post(API_URL + "/signup", {
                username,
                email,
                password,
                confirmPassword
            }, {
                headers: {"Content-Type": "application/json"}
            }
        );
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();