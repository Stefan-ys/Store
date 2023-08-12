import axios from "axios";
import authHeader from "./auth-header";

const API_STORE_URL = "http://localhost:8080/api/store";

const getProducts = (sortBy) => {
    return axios
        .get(API_STORE_URL + "/all-products", {params: { sortBy}} )
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const getProduct = () => {
    return axios
        .get(API_STORE_URL + "/product/{productId}")
        .then((response)=> response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};


const StoreService = {getProducts, getProduct};

export default StoreService;