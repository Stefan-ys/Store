import React, { useState, useEffect } from "react";
import styles from "../css/product-view.module.css";
import { withRouter } from "../common/with-router";
import StoreService from "../services/store.service";

const ProductView = () => {
    const mockProduct = {
        name: "ITEM",
        description: "Lorem ipsum dolor sit amet...",
        price: 9.99,
        catalogNumber: 1,
        productCategory: "Category",
        manufacturer: "Manufacturer",
        rating: 4,
        reviews: [
            {
                username: "User1",
                comment: "Great product!",
                rating: 5,
                reviewDate: "2023-06-16",
            },
            {
                username: "User2",
                comment: "Nice quality.",
                rating: 4,
                reviewDate: "2023-06-15",
            },
        ],
    };

    const [product, setProduct] = useState(mockProduct);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [reviewExpanded, setReviewExpanded] = useState(false);

    const fetchProductData = () => {
        setLoading(true);
        StoreService.getProduct()
            .then((data) => {
                // TODO: Set the fetched product data to the state 'product'
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching product data: ", error);
                setMessage(
                    error.response
                        ? error.response.data.message
                        : "An error has occurred."
                );
            });
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const handleAddToCartClick = () => {
        // TODO: Implement the logic to add the product to the cart
    };

    const handleLeaveReviewClick = () => {
        setReviewExpanded(true);
    };

    const handleCancelReviewClick = () => {
        setReviewExpanded(false);
    };


    return (
        <div className={styles.productContainer}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <p className={styles.productCategory}>
                Category: {product.productCategory}
            </p>
            <p className={styles.productManufacturer}>
                Manufacturer: {product.manufacturer}
            </p>
            <p className={styles.productRating}>
                Rating: {product.rating} / 5
            </p>

            <button
                className={styles.button}
                onClick={handleAddToCartClick}
                disabled={loading}
            >
                {loading ? "Adding to Cart..." : "Add to Cart"}
            </button>

            <div className={styles.reviewsSection}>
                <h3>Product Reviews</h3>
                <ul className={styles.reviewList}>
                    {product.reviews.map((review, index) => (
                        <li key={index} className={styles.reviewItem}>
                            <p className={styles.reviewUsername}>{review.username}</p>
                            <p className={styles.reviewComment}>{review.comment}</p>
                            <p className={styles.reviewRating}>Rating: {review.rating} / 5</p>
                            <p className={styles.reviewDate}>Reviewed on: {review.reviewDate}</p>
                        </li>
                    ))}
                </ul>
                <button
                    className={styles.button}
                    onClick={handleLeaveReviewClick}
                >
                    Leave Review
                </button>

                {reviewExpanded && (
                    <div className={styles.writeReviewSection}>
                        <h3>Write a Review</h3>
                        <form>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={styles.inputField}
                                    // Add more attributes and event handlers as needed
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="rating">Rating:</label>
                                <select
                                    id="rating"
                                    name="rating"
                                    className={styles.inputField}
                                    // Add more attributes and event handlers as needed
                                >
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="comment">Comment:</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows="4"
                                    className={styles.inputField}
                                    // Add more attributes and event handlers as needed
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitReviewButton}>
                                Submit Review
                            </button>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={handleCancelReviewClick}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

            </div>
            {message && <p className={styles.errorMessage}>{message}</p>}
        </div>
    );
};

export default withRouter(ProductView);
