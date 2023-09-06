import axios from "axios";
import authHeader from "./auth-header";

const API_ADMIN_USERS_URL = "http://localhost:8080/api/admin/users";
const API_ADMIN_PRODUCTS_URL = "http://localhost:8080/api/admin/products";
const API_ADMIN_COMMENT_URL = "http://localhost:8080/api/admin/comment";

const getAllUsers = (currentPage, productsPerPage, categoryOption, sortOption, sortOrder) => {
    const params = {
        page: currentPage - 1,
        size: productsPerPage,
        category: categoryOption,
        sortBy: sortOption,
        sortOrder: sortOrder
    };
    return axios
        .get(API_ADMIN_USERS_URL + "/all-users", { params: params, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const updateUsersAuthority = (userId, authotiry) => {
    return axios
        .get(API_ADMIN_USERS_URL + "/update-user-authority/" + userId, { params: authotiry, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const deleteUserAccoount = (userId) => {
    return axios
        .delete(API_ADMIN_USERS_URL + "/delete-user-account/" + userId, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const AdminService = { getAllUsers, updateUsersAuthority, deleteUserAccoount };

export default AdminService;
