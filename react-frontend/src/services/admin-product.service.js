import axios from "axios";
import authHeader from "./auth-header";

const API_ADMIN_PRODUCTS_URL = "http://localhost:8080/api/admin/product";

const getAllProductsService = (currentPage, productsPerPage, sortOption, sortOrder) => {
    const params = {
        page: currentPage - 1,
        size: productsPerPage,
        sortBy: sortOption,
        sortOrder: sortOrder
    };
    console.log("check2")
    console.log("|", currentPage ,"|",productsPerPage ,"|", sortOption, "|", sortOrder)
    return axios
        .get(API_ADMIN_PRODUCTS_URL + "/all-products", { params: params, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const addProductService = (product) => {
    return axios
        .post(API_ADMIN_PRODUCTS_URL + "/add-product", { params: product, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const changeProductStatus = (productId, status) => {
    return axios
        .put(API_ADMIN_PRODUCTS_URL + "/change-status/" + productId, status, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}

const deleteProductService = (productId) => {
    return axios
        .delete(API_ADMIN_PRODUCTS_URL + "/delete-user-account/" + productId, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const AdminProductService = { getAllProductsService, addProductService, changeProductStatus, deleteProductService };

export default AdminProductService;
