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
    const [showNotification, setShowNotification] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        image: "",
        productName: "",
        quantity: 0,
        price: 0,

    });

    const TEMP_CART_KEY = 'tempCart';

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        getShoppingCart();
    }, [isLoggedIn]);
    useEffect(() => {
        if (showNotification) {
            const timeout = setTimeout(() => {
                setShowNotification(false);
            }, 3000); 
            return () => clearTimeout(timeout);
        }
    }, [showNotification, shoppingCart]);

    const getShoppingCart = async () => {
        try {
            let cart;
            if (isLoggedIn) {
                if (JSON.parse(localStorage.getItem(TEMP_CART_KEY)).products.length > 0) {
                    const tempCart = JSON.parse(localStorage.getItem(TEMP_CART_KEY)) || { products: [] };

                    const tempCartObject = tempCart.products.reduce((acc, product) => {
                        acc[product.productId] = product.quantity;
                        return acc;
                    }, {});

                    await ShoppingCartService.transferProducts(tempCartObject);
                }

                localStorage.setItem(TEMP_CART_KEY, JSON.stringify({ products: [] }));
                cart = (await ShoppingCartService.getProducts());
            } else {
                const tempCart = JSON.parse(localStorage.getItem(TEMP_CART_KEY)) || { products: {} };

                const tempCartObject = tempCart.products.reduce((acc, product) => {
                    acc[product.productId] = product.quantity;
                    return acc;
                }, {});

                cart = (await ShoppingCartService.getTmpProducts(tempCartObject));
            }
        
            setShoppingCart(cart);
            return cart;
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
            const cart = await getShoppingCart();
            
            const productDetails = cart.products.find(product => product.productId === productId);

            setNotificationContent({
                image: productDetails.image,
                productName: productDetails.productName,
                quantity: productDetails.quantity,
                price: productDetails.price,
            });
            setShowNotification(true);
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
        getShoppingCart,
        addToShoppingCart,
        changeProductQuantity,
        removeFromShoppingCart,
        clearShoppingCart,
    }

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}

            <div className={`notification-container ${showNotification ? "show" : "hide"}`}>
                <img src={notificationContent.image} alt={notificationContent.name} />
                <div>
                    <p>{notificationContent.productName}</p>
                    <p>Quantity: {notificationContent.quantity}</p>
                    <p>Price: ${notificationContent.price}</p>
                </div>
                <button onClick={() => setShowNotification(false)}>Continue Shopping</button>
                <button onClick={() => setShowNotification(false)}>Show Shopping Cart</button>
            </div>

        </ShoppingCartContext.Provider>
    );
}