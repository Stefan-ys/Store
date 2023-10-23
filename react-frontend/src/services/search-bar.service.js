import axios from "axios";
import authHeader from "./auth-header";


const API_STORE_URL = "http://localhost:8080/api/search-bar";

const searchForProducts = (keyWord, currentPage, productsPerPage, sortOption, sortOrder) => {
    const params = {
        page: currentPage - 1,
        size: productsPerPage,
        sortBy: sortOption,
        sortOrder: sortOrder
    };

    return axios
        .get(API_STORE_URL + "/search-product" + keyWord, {
            params: params, headers: authHeader()
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Axios error: ", error);
            throw error;
        });
};


const SearchService = { searchForProducts };

export default SearchService;