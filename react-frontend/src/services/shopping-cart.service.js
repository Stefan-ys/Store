import axios from "axios";

const API_CART_URL = "http://localhost:8080/api/shopping-cart";


const addToCart = (productId) => {
    return axios
        .post(API_CART_URL + "/add", { productId })
        .then((error) => {
            console.error("Error adding to cart: ", error);
            throw error;
        });
};

const removeFromCart = (productId) => {
    return axios
        .delete(API_CART_URL + "/remove/" + { productId })
        .then((response) => response.data)
        .catch((error) => {
            console.log("Error removing from cart: ", error);
            throw error;
        });
};

const removeAll = () => {
    return axios
        .delete(API_CART_URL + "remove-all")
        .then((response) => response.data)
        .catch((error) => {
            console.log("Error remove from cart: ", error);
            throw error;
        });
};

const changeQuantity = (productId, quantity) => {
    return axios
        .put((response) => response.data)
        .catch((error) => {
            console.log("Error changing quantity: ", error);
            throw error;
        });
};

const transferToUserCart = (cartItems) => {

};

const ShoppingCartService = { addToCart, removeFromCart, removeAll, changeQuantity, transferToUserCart };
export default ShoppingCartService;