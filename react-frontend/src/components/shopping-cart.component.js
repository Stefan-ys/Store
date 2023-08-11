import React, {useState} from "react";
import styles from "../css/shopping-cart.module.css";
import {withRouter} from "../common/with-router";

const ShoppingCart = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Example user products in the shopping cart
    const userProducts = [
        {name: "Product 1", count: 2, price: 10.99},
        {name: "Product 2", count: 1, price: 5.99},
        {name: "Product 3", count: 5, price: 1},
        {name: "Product 5", count: 1, price: 44.5},
        // ... add more products as needed ...
    ];

    // Calculate total price and total products count
    const totalPrice = userProducts.reduce((total, product) => total + product.count * product.price, 0);
    const totalProducts = userProducts.reduce((total, product) => total + product.count, 0);

    const handleCheckoutClick = () => {
        // TODO: Implement checkout logic
    };

    return (
        <div className={styles.shoppingCartContainer}>
            {userProducts.length === 0 ? (
                <p className={styles.emptyCartMessage}>Your shopping cart is empty</p>
            ) : (
                <div className={styles.shoppingCartContainer}>
                    <h2>Your Shopping Cart</h2>
                    <table className={styles.cartTable}>
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Count</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.count}</td>
                                <td>${product.price.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={styles.cartSummary}>
                        <p>Total Products: {totalProducts}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                    <button className={styles.checkoutButton} onClick={handleCheckoutClick}>
                        Checkout
                    </button>
                    {message && <p className={styles.errorMessage}>{message}</p>}

                </div>
            )}
        </div>
    );
};

export default withRouter(ShoppingCart);
