import axios from "axios";
import authHeader from "./auth-header";


const API_ADMIN_USERS_URL = "http://localhost:8080/api/admin/users";

const getAllUsersService = () => {
    return axios
        .get(API_ADMIN_USERS_URL + "/all-users", {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const updateUsersAuthorityService = (userId, authority) => {
    return axios
        .put(API_ADMIN_USERS_URL + "/update-user-authority" + userId, {params: authority, headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const deleteUserAccountService = (userId) => {
    return axios
        .delete(API_ADMIN_USERS_URL + "/delete-user-account" + userId, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const AdminUserService = {getAllUsersService, updateUsersAuthorityService, deleteUserAccountService};

export default AdminUserService;
