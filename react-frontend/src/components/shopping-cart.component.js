import React, {useEffect, useState} from "react";
import styles from "../css/shopping-cart.module.css";
import {withRouter} from "../common/with-router";
import ShoppingCartService from "../services/shopping-cart.service";

const ShoppingCart = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState( [
        {name: "Product 1", count: 2, price: 10.99},
        {name: "Product 2", count: 1, price: 5.99},
        {name: "Product 3", count: 5, price: 1},
        {name: "Product 5", count: 1, price: 44.5}],);


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);

        ShoppingCartService.getProducts()
            .then((data) => {
                console.log(data);
                setTotalPrice(data.totalPrice);
                setTotalWeight(data.totlWeight);
                setProducts(data.products);
                setTotalProducts(products.reduce((total, product) => total + product.count, 0));
            })
            .catch((error) => {
                console.log("Error fetching products data: ", error);
                setMessage(error.response ? error.response.data.message : "An error has occurred.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleCheckoutClick = () => {
        // TODO: Implement checkout logic
    };


    return (
        <div className={styles.shoppingCartContainer}>
            {products.length === 0 ? (
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
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.count}</td>
                                <td>${product.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={styles.cartSummary}>
                        <p>Total Products: {totalProducts}</p>
                        <p>Total Price: ${totalPrice}</p>
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
