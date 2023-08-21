import axios from "axios";
import authHeader from "./auth-header";


const API_STORE_URL = "http://localhost:8080/api/product";

const getProducts = (sortBy) => {
    return axios
        .get(API_STORE_URL + "/all", { params: { sortBy }, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const getProduct = (productId) => {
    return axios
        .get(API_STORE_URL + "/" + productId, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const submitReview = (productId, comment, rating) => {
    console.log(productId, " -- ", comment, " -- ", rating);
    return axios
        .post(API_STORE_URL + "/review/" + productId, { params: { comment, rating }, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });

};

const StoreService = { getProducts, getProduct, submitReview };

export default StoreService;