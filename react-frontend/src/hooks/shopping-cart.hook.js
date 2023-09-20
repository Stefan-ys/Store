import React, { useState, useEffect, createContext, useContext } from "react";
import ShoppingCartService from "../services/shopping-cart.service";
import useAuth from "./auth.hook";

const ShoppingCartContext = createContext();

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState({
        picture: "image",
        products: [],
        totalPrice: 0,
        totalProducts: 0,
        totalWeight: 0,
    });
    const TEMP_CART_KEY = 'tempCart';

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        getShoppingCart();
    }, []);

    const getShoppingCart = async () => {
        try {
            let cartData;
            if (isLoggedIn) {
                cartData = await ShoppingCartService.getProducts();
            } else {
                const tempCart = JSON.parse(localStorage.getItem(TEMP_CART_KEY)) || { products: {} };

                const tempCartMap = new Map();
                Object.entries(tempCart.products).forEach(([index, product]) => {
                  tempCartMap.set(product.productId, product.quantity);
                });
                const tempCartObject = Object.fromEntries(tempCartMap);
                
                cartData = await ShoppingCartService.getTmpProducts(tempCartObject);

            } setShoppingCart(cartData);
        } catch (error) {
            console.log("Error fetching shopping cart data: ", error);
        }
    }
    const addToShoppingCart = async (productId) => {
        try {
            if (isLoggedIn) {
                await ShoppingCartService.addToCart(productId);
            } else {
                const tempCart = JSON.parse(localStorage.getItem(TEMP_CART_KEY)) || { products: {} };
                let productIndex = tempCart.products.findIndex((product) => product.productId === productId);

                if (productIndex !== -1) {
                    tempCart.products[productIndex].quantity++;
                } else {
                    tempCart.products.push({ productId, quantity: 1 });
                }
                const updatedCart = {
                    products: tempCart.products,
                }
                localStorage.setItem(TEMP_CART_KEY, JSON.stringify(updatedCart));
            }
            getShoppingCart();
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromShoppingCart = async (productId) => {
        try {
            if (isLoggedIn) {
                await ShoppingCartService.removeFromCart(productId);
            } else {
                const tempCart = JSON.parse(localStorage.getItem(TEMP_CART_KEY)) || {
                    products: [],
                }
                const updatedProducts = tempCart.products.filter(
                    (product) => product.productId !== productId
                )
                const updatedCart = {
                    products: updatedProducts,
                }
                localStorage.setItem(TEMP_CART_KEY, JSON.stringify(updatedCart));
            }
            getShoppingCart();
        } catch (error) {
            console.log(error);
        }
    }

    const changeProductQuantity = async (productId, newQuantity) => {
        try {
            if (isLoggedIn) {
                await ShoppingCartService.changeQuantity(productId, newQuantity);
            } else {
                const tempCart = JSON.parse(localStorage.getItem(TEMP_CART_KEY)) || { products: {} };

                let updatedProducts;
                if (newQuantity <= 0) {
                    updatedProducts = tempCart.products.filter(
                        (product) => product.productId !== productId
                    )
                } else {
                    updatedProducts = tempCart.products.map((product) =>
                        product.productId === productId
                            ? { ...product, quantity: newQuantity }
                            : product
                    )
                }
                const updatedCart = {
                    ...tempCart,
                    products: updatedProducts,
                }
                localStorage.setItem(TEMP_CART_KEY, JSON.stringify(updatedCart));
            }
            getShoppingCart();
        } catch (error) {
            console.log(error);
        }
    }

    const clearShoppingCart = async () => {
        try {
            if (isLoggedIn) {
                await ShoppingCartService.removeAll();
            } else {
                const updatedCart = { products: [] }
                localStorage.setItem(TEMP_CART_KEY, JSON.stringify(updatedCart));
            }
            getShoppingCart();
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        shoppingCart,
        addToShoppingCart,
        changeProductQuantity,
        removeFromShoppingCart,
        clearShoppingCart,
    }

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
