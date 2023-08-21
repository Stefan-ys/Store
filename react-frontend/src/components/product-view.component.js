import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/product-view.module.css";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import { withRouter } from "../common/with-router";
import StoreService from "../services/store.service";
import ShoppingCartService from "../services/shopping-cart.service";


const emptyProduct = {
    name: "",
    description: "",
    price: 0,
    category: "",
    manufacturer: "",
    rating: 0,
    reviews: [],
}


const ProductView = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(emptyProduct);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [reviewExpanded, setReviewExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);


    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        setLoading(true);
        setMessage("");

        try {
            const fetchProduct = await StoreService.getProduct(productId);
            setProduct(fetchProduct);
        } catch (error) {
            console.log(error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleReviewClick = () => {
        setReviewExpanded(!reviewExpanded);
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log(productId);
            await StoreService.submitReview(productId, comment, rating);
            setComment("");
            setRating(0);
        } catch (error) {
            console.log(error.message);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const addToShoppingCart = async () => {
        setLoading(true);
        setMessage("");
        try {
            await ShoppingCartService.addToCart(productId);
        } catch (error) {
            console.log(error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.productContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Price: ${product.price}</p>
                    <p className={styles.productCategory}>Category: {product.category}</p>
                    <p className={styles.manufacturer}>Manufacturer: {product.manufacturer}</p>
                    <p className={styles.productRating}>Rating: {product.rating}</p>

                    <button
                        className={styles.button}
                        onClick={addToShoppingCart}
                        disabled={loading}
                    >
                        {loading ? "Adding to Cart..." : "Add to Cart"}
                    </button>

                    <div className={styles.reviewsSection}>
                        <h3>Product Reviews</h3>
                        {product.reviews && product.reviews.length > 0 ? (
                            <ul className={styles.reviewList}>
                                {product.reviews.map((review) => (
                                    <li key={review.id} className={styles.reviewItem}>
                                        {/* ... */}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews available.</p>
                        )}
                        <button className={styles.button} onClick={handleReviewClick}>
                            Leave Review
                        </button>

                        {reviewExpanded && (
                            <div className={styles.writeReviewSection}>
                                <h3>Write a Review</h3>
                                <Form onSubmit={handleSubmitReview}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="rating">Rating:</label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            className={styles.inputField}
                                            onChange={(event) => setRating(event.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <option key={value} value={value}>
                                                    {value} Stars
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="comment">Comment:</label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            rows="4"
                                            className={styles.inputField}
                                            onChange={(event) => setComment(event.target.value)}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={styles.submitReviewButton}>
                                        Submit Review
                                    </button>
                                    <button type="button" className={styles.button} onClick={handleReviewClick}>
                                        Cancel
                                    </button>
                                </Form>
                            </div>
                        )}
                    </div>
                    {message && <p className={styles.errorMessage}>{message}</p>}
                </>
            )}
        </div>
    );
};

export default withRouter(ProductView);
