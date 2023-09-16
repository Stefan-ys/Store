import React, { useState, useEffect, createContext, useContext } from "react";
import ShoppingCartService from "../services/shopping-cart.service";


const ShoppingCartContext = createContext();

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [shoppingCart, setShoppingCart] = useState({
        picture: "image",
        products: [],
        totalPrice: 0,
        totalProducts: 0,
        totalWeight: 0,
    });

    useEffect(() => {
        getShoppingCart();
    }, []);

    const getShoppingCart = async () => {
        setLoading(true);
        setMessage("");
        try {
            const cartData = await ShoppingCartService.getProducts();
            setShoppingCart(cartData);
        } catch (error) {
            console.log("Error fetching shopping cart data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const updateShoppingCart = async () => {
        try {
            const cartData = await ShoppingCartService.getProducts();
            setShoppingCart(cartData);
        } catch (error) {
            console.log("Error fetching shopping cart data: ", error);
        }
    };

    const value = {
        shoppingCart,
        updateShoppingCart,
    };

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
