import axios from "axios";
import authHeader from "./auth-header";


const API_STORE_URL = "http://localhost:8080/api/store";

const getAllProducts = (currentPage, productsPerPage, categoryOptions, statusOptions, sortOption, sortOrder) => {
    const categories = categoryOptions.filter(option => option.checked).map(option => option.label).join(',');
    const status = statusOptions.filter(option => option.checked).map(option => option.label).join(',');

    const params = {
        page: currentPage - 1,
        size: productsPerPage,
        categories: categories,
        status: status,
        sortBy: sortOption,
        sortOrder: sortOrder
    };

    return axios
        .get(API_STORE_URL + "/all-products", {
            params: params, headers: authHeader()
        })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const StoreService = {getAllProducts};

export default StoreService;