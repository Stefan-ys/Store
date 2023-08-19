import axios from "axios";


const API_STORE_URL = "http://localhost:8080/api/store";

const getProducts = (sortBy) => {
    return axios
        .get(API_STORE_URL + "/all-products", { params: { sortBy }, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const getProduct = (productId) => {
    return axios
        .get(API_STORE_URL + "/product/" + productId, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const submitReview = (productId, comment, rating) => {
    return axios
        .post(API_STORE_URL + "/product/" + productId, { params: { address, rating }, headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });

};

const StoreService = { getProducts, getProduct };

export default StoreService;