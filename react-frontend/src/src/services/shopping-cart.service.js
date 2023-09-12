import axios from "axios";
import authHeader from "./auth-header";

const API_CART_URL = "http://localhost:8080/api/shopping-cart";


const getProducts = () => {
    return axios
        .get(API_CART_URL + "/get-products", { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error getting products from cart : ", error);
            throw error;
        });
};
const addToCart = (productId) => {
    return axios
        .post(API_CART_URL + "/add-product/" + productId, null, { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error adding to cart: ", error);
            throw error;
        });
};

const removeFromCart = (productId) => {
    return axios
        .delete(API_CART_URL + "/remove-product/" + productId, { headers: authHeader() }) 
        .then((response) => response.data)
        .catch((error) => {
            console.log("Error removing from cart: ", error);
            throw error;
        });
};

const removeAll = () => {
    return axios
        .delete(API_CART_URL + "/clear-cart", { headers: authHeader() })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Error remove from cart: ", error);
            throw error;
        });
};

const changeQuantity = (productId, quantity) => {
    console.log(productId, "<--->",quantity);
    return axios
        .put(API_CART_URL + "/change-quantity/" + productId + "?quantity=" + quantity, null, { headers: authHeader() }) 
        .then((response) => response.data)
        .catch((error) => {
            console.log("Error changing quantity: ", error);
            throw error;
        });
};

const transferToUserCart = (cartItems) => {

};

const ShoppingCartService = { getProducts, addToCart, removeFromCart, removeAll, changeQuantity, transferToUserCart };
export default ShoppingCartService;