import axios from "axios";
import authHeader from "./auth-header";


const API_STORE_URL = "http://localhost:8080/api/product";

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
    return axios
        .post(API_STORE_URL + "/review", { productId, comment, rating }, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });

};

const StoreService = { getProduct, submitReview };

export default StoreService;