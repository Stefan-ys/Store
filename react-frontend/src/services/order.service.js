import axios from "axios";
import authHeader from "./auth-header";


const API_STORE_URL = "http://localhost:8080//api/orders";

const getMyOrders = () => {
    return axios
        .get(API_STORE_URL + "/get-my-orders", { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const placeOrder = (order) => {
    return axios
        .post(API_STORE_URL + "/place-order", { order }, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const OrderService = { getMyOrders, placeOrder };

export default OrderService;