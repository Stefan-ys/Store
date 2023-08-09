import axios from "axios";
import authHeader from "./auth-header";

const API_USERS_URL = "http://localhost:8080/api/user";

const getMyProfile = () => {
    return axios
        .get(API_USERS_URL + "/my-profile", {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const updateMyProfile = (data) => {
    return axios
        .put(API_USERS_URL + "/my-profile", data, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};
const UserService = {getMyProfile, updateMyProfile};

export default UserService;