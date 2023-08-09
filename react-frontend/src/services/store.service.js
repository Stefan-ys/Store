import axios from "axios";
import authHeader from "./auth-header";

const API_STORE_URL = "http://localhost:8080/api/store";

const getProducts = () => {
    return axios
        .get(API_STORE_URL + "/all-products" )
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const StoreService = {getProducts};

export default StoreService;