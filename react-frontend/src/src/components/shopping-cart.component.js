import React, { useEffect, useState } from "react";
import styles from "../css/shopping-cart.module.css";
import { withRouter } from "../common/with-router";
import { FaTrash } from "react-icons/fa";
import ShoppingCartService from "../services/shopping-cart.service";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        setMessage("");
        try {
            const data = await ShoppingCartService.getProducts();

            setProducts(data.products);
            setTotalPrice(data.totalPrice);
            setTotalWeight(data.totalWeight);
            setTotalProducts(data.totalProducts);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await ShoppingCartService.removeFromCart(productId);
            getProducts();
        } catch (error) {
            console.error("Error removing from cart: ", error);
        }
    };

    const changeQuantity = async (productId, newQuantity) => {
        try {
            await ShoppingCartService.changeQuantity(productId, newQuantity);
            getProducts();
        } catch (error) {
            console.error("Error changing quantity: ", error);
        }
    };

    const clearCart = async () => {
        try {
            await ShoppingCartService.removeAll();
            getProducts();
        } catch (error) {
            console.error("Error clearing the cart: ", error);
        }
    };

    const handleCheckoutClick = () => {
        // TODO: Implement checkout logic
    };

    return (
        <div className={styles.shoppingCartContainer}>
            {products.length === 0 ? (
                <p className={styles.emptyCartMessage}>Your shopping cart is empty</p>
            ) : (
                <div className={styles.shoppingCartContent}>
                    <h2>Your Shopping Cart</h2>
                    <table className={styles.cartTable}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Remove item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <Link to={`/product/${product.productId}`} state={product} style={{ textDecoration: 'none' }}>
                                        <td>{product.productName}</td>
                                    </Link>

                                    <td>
                                        <div className={styles.quantityAdjust}>
                                            <button onClick={() => changeQuantity(product.productId, product.quantity - 1)}>-</button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={product.quantity}
                                                onChange={(e) => changeQuantity(product.productId, e.target.value)}
                                            />
                                            <button onClick={() => changeQuantity(product.productId, product.quantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>
                                        <FaTrash onClick={() => removeFromCart(product.productId)} className={styles.removeItem} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.cartSummary}>
                        <p>Total Products: {totalProducts}</p>
                        <p>Total Price: ${totalPrice}</p>
                    </div>
                    <div className={styles.cartActions}>
                        <button className={styles.clearCartButton} onClick={clearCart}>
                            Clear Cart
                        </button>
                        <button className={styles.checkoutButton} onClick={handleCheckoutClick}>
                            Checkout
                        </button>
                    </div>
                    {message && <p className={styles.errorMessage}>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default withRouter(ShoppingCart);