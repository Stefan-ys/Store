import React, { useEffect, useState } from "react";
import styles from "../css/shopping-cart.module.css";
import { withRouter } from "../common/with-router";
import { FaTrash } from "react-icons/fa";
import ShoppingCartService from "../services/shopping-cart.service";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../utils/shopping-cart-data.util";

const ShoppingCart = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { shoppingCart, updateShoppingCart } = useShoppingCart();


    const removeFromCart = async (productId) => {
        try {
            await ShoppingCartService.removeFromCart(productId);
            updateShoppingCart();
        } catch (error) {
            console.error("Error removing from cart: ", error);
        }
    };

    const changeQuantity = async (productId, newQuantity) => {
        try {
            await ShoppingCartService.changeQuantity(productId, newQuantity);
            updateShoppingCart();
        } catch (error) {
            console.error("Error changing quantity: ", error);
        }
    };

    const clearCart = async () => {
        try {
            await ShoppingCartService.removeAll();
            updateShoppingCart();
        } catch (error) {
            console.error("Error clearing the cart: ", error);
        }
    };

    const handleCheckoutClick = () => {
        // TODO: Implement checkout logic
    };

  return (
        <div className={styles.shoppingCartContainer}>
            {loading && <div className={styles.loading}>Loading...</div>}
            {message && <div className={styles.errorMessage}>{message}</div>}
            {shoppingCart.products.length === 0 ? (
                <p className={styles.emptyCartMessage}>Your shopping cart is empty</p>
            ) : (
                <div className={styles.shoppingCartContent}>
                    <h2>Your Shopping Cart</h2>
                    <table className={styles.cartTable}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Remove item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shoppingCart.products.map((product, index) => (
                                <tr key={index}>
                                    <td><img src={product.image} className={styles.productImage} /></td>
                                    <td>
                                        <Link to={`/product/${product.productId}`} state={product} style={{ textDecoration: 'none' }}>
                                            {product.productName}
                                        </Link>
                                    </td>
                                    <td>
                                        <div className={styles.quantityAdjust}>
                                            <button onClick={() => changeQuantity(product.productId, product.quantity - 1)}>-</button>
                                            <p
                                                type="number"
                                                min="1"
                                                value={product.quantity}
                                                onChange={(e) => changeQuantity(product.productId, e.target.value)}
                                            >  {"  "  + product.quantity +  "  "}  </p>
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
                        <p>Total Products: {shoppingCart.totalProducts}</p>
                        <p>Total Price: ${shoppingCart.totalPrice}</p>
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

