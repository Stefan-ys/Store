import axios from "axios";
import authHeader from "../auth-header";


const API_ADMIN_ORDERS_URL = "http://localhost:8080///api/admin/orders";

const getOrders = (status) => {
    return axios
        .get(API_ADMIN_ORDERS_URL + "/get-orders", status, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const getUserOrders = (userId) => {
    return axios
        .get(API_ADMIN_ORDERS_URL + "/get-user-orders" + userId, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const changeOrderStatus = (orderId, status) => {
    return axios
        .put(API_ADMIN_ORDERS_URL + "/change-status" + orderId, status, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const deleteOrder = (orderId) => {
    return axios
        .delete(API_ADMIN_ORDERS_URL + "/delete-order" + orderId, {headers: authHeader()})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Axios error: ", error);
            throw error;
        });
};

const AdminOrderService = {getOrders, getUserOrders, changeOrderStatus, deleteOrder};

export default AdminOrderService;